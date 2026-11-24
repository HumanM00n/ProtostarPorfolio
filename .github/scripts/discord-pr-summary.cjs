// Résumé Discord d'une PR mergée sur main.
// Appelé par .github/workflows/discord-pr-merged.yml via actions/github-script.

const MAX_DESCRIPTION = 1500; // Discord : 4096 max pour une description d'embed
const MAX_FIELD = 1000; // Discord : 1024 max par champ
const MAX_COMMITS = 10;
const COLOR = 0xff1e2d; // rouge "volt" du site

const truncate = (text, max) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

// Retire les commentaires HTML et le bruit des descriptions de PR (templates, lignes vides multiples).
const cleanBody = (body) =>
  (body ?? "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

function buildPayload({ pr, commits, files, siteUrl }) {
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
    { name: "Mergée par", value: pr.merged_by ? pr.merged_by.login : "—", inline: true },
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
  if (siteUrl) fields.push({ name: "Site", value: siteUrl });

  return {
    username: "Protostar · GitHub",
    allowed_mentions: { parse: [] }, // jamais de @everyone/@here déclenché par le texte d'une PR
    embeds: [
      {
        title: truncate(`✅ PR #${pr.number} mergée : ${pr.title}`, 256),
        url: pr.html_url,
        description,
        color: COLOR,
        fields,
        footer: { text: `${pr.head.ref} → ${pr.base.ref}` },
        timestamp: pr.merged_at,
      },
    ],
  };
}

module.exports = async ({ github, context, core }) => {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    core.warning("Secret DISCORD_WEBHOOK_URL absent : notification Discord ignorée.");
    return;
  }

  const pr = context.payload.pull_request;
  const { owner, repo } = context.repo;
  const [commits, files] = await Promise.all([
    github.paginate(github.rest.pulls.listCommits, { owner, repo, pull_number: pr.number, per_page: 100 }),
    github.paginate(github.rest.pulls.listFiles, { owner, repo, pull_number: pr.number, per_page: 100 }),
  ]);

  const payload = buildPayload({ pr, commits, files, siteUrl: process.env.SITE_URL });
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
