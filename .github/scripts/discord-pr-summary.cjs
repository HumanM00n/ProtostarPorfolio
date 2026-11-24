// Résumés Discord des PR, appelés via actions/github-script :
// - "merged"  : PR mergée sur main (.github/workflows/discord-pr-merged.yml) ;
// - "preview" : CI passée et preview Vercel déployée (job deploy-preview de ci-cd.yml).

const MAX_DESCRIPTION = 1500; // Discord : 4096 max pour une description d'embed
const MAX_FIELD = 1000; // Discord : 1024 max par champ
const MAX_COMMITS = 10;
const COLOR = { merged: 0xff1e2d, preview: 0x3ba55d }; // rouge "volt" du site / vert

const truncate = (text, max) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

// Retire les commentaires HTML et le bruit des descriptions de PR (templates, lignes vides multiples).
const cleanBody = (body) =>
  (body ?? "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

function buildPayload({ pr, commits, files, siteUrl, kind = "merged", previewUrl }) {
  const description = truncate(cleanBody(pr.body) || "_Pas de description._", MAX_DESCRIPTION);

  const commitLines = commits
    .slice(0, MAX_COMMITS)
    .map((c) => `• [\`${c.sha.slice(0, 7)}\`](${c.html_url}) ${truncate(c.commit.message.split("\n")[0], 90)}`);
  if (commits.length > MAX_COMMITS) commitLines.push(`… et ${commits.length - MAX_COMMITS} autre(s)`);

  // Regroupe les fichiers modifiés par grande zone du projet (src/content, src/features…).
  const areas = new Map();
  for (const file of files) {
    const parts = file.filename.split("/");
    const area = parts.length > 2 ? parts.slice(0, 2).join("/") : parts[0];
    areas.set(area, (areas.get(area) ?? 0) + 1);
  }
  const areaLines = [...areas.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([area, count]) => `• \`${area}\` (${count})`);

  const fields = [
    { name: "Auteur", value: `[${pr.user.login}](${pr.user.html_url})`, inline: true },
    kind === "merged"
      ? { name: "Mergée par", value: pr.merged_by ? pr.merged_by.login : "—", inline: true }
      : { name: "Statut", value: "CI ✅ · en attente de review", inline: true },
    {
      name: "Changements",
      value: `${pr.changed_files} fichier(s) · +${pr.additions} / −${pr.deletions}`,
      inline: true,
    },
  ];
  if (commitLines.length) {
    fields.push({ name: `Commits (${commits.length})`, value: truncate(commitLines.join("\n"), MAX_FIELD) });
  }
  if (areaLines.length) fields.push({ name: "Zones touchées", value: truncate(areaLines.join("\n"), MAX_FIELD) });
  if (kind === "preview" && previewUrl) {
    fields.unshift({ name: "🔍 Preview", value: previewUrl });
  } else if (siteUrl) {
    fields.push({ name: "Site", value: siteUrl });
  }

  const title =
    kind === "preview" ? `🔍 Preview prête · PR #${pr.number} : ${pr.title}` : `✅ PR #${pr.number} mergée : ${pr.title}`;

  return {
    username: "Protostar · GitHub",
    allowed_mentions: { parse: [] }, // jamais de @everyone/@here déclenché par le texte d'une PR
    embeds: [
      {
        title: truncate(title, 256),
        url: kind === "preview" && previewUrl ? previewUrl : pr.html_url,
        description,
        color: COLOR[kind],
        fields,
        footer: { text: `${pr.head.ref} → ${pr.base.ref}` },
        timestamp: kind === "merged" ? pr.merged_at : new Date().toISOString(),
      },
    ],
  };
}

module.exports = async ({ github, context, core }, { kind = "merged", previewUrl } = {}) => {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    core.warning("Webhook Discord absent : notification ignorée.");
    return;
  }

  const { owner, repo } = context.repo;
  // Données fraîches de la PR (le payload d'un push ne contient pas additions/deletions à jour).
  const { data: pr } = await github.rest.pulls.get({ owner, repo, pull_number: context.payload.pull_request.number });
  const [commits, files] = await Promise.all([
    github.paginate(github.rest.pulls.listCommits, { owner, repo, pull_number: pr.number, per_page: 100 }),
    github.paginate(github.rest.pulls.listFiles, { owner, repo, pull_number: pr.number, per_page: 100 }),
  ]);

  const payload = buildPayload({ pr, commits, files, siteUrl: process.env.SITE_URL, kind, previewUrl });
  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    core.setFailed(`Discord a répondu ${response.status} : ${await response.text()}`);
  }
};

module.exports.buildPayload = buildPayload;
