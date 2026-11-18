import { site } from "@/data/site";
import { telHref } from "@/lib/mailto";
import { ArrowUpRight, Clock, Lightning, Mail, MapPin, Phone } from "@/components/ui/icons";
import { CopyEmailButton } from "./CopyEmailButton";

export function ContactDetails() {
  const { contact, identity } = site;

  return (
    <div className="space-y-5">
      <div className="border-t border-paper/15">
        <a
          href={`mailto:${contact.email}`}
          className="group flex items-center justify-between gap-4 border-b border-paper/10 py-4 transition-colors hover:bg-paper/3"
        >
          <span className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-volt" />
            <span>
              <span className="label-mono block text-[8px] text-paper/35">Email direct</span>
              <span className="mt-0.5 block text-sm font-medium text-paper">{contact.email}</span>
            </span>
          </span>
          <ArrowUpRight className="h-4 w-4 text-paper/30 transition-colors group-hover:text-volt" />
        </a>
        <CopyEmailButton email={contact.email} />
        <a
          href={telHref(contact.phone)}
          className="group flex items-center justify-between gap-4 border-b border-paper/10 py-4 transition-colors hover:bg-paper/3"
        >
          <span className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-volt" />
            <span>
              <span className="label-mono block text-[8px] text-paper/35">Téléphone</span>
              <span className="mt-0.5 block text-sm font-medium text-paper">{contact.phone}</span>
            </span>
          </span>
          <ArrowUpRight className="h-4 w-4 text-paper/30 transition-colors group-hover:text-volt" />
        </a>
        <div className="flex items-center gap-3 border-b border-paper/10 py-4">
          <MapPin className="h-4 w-4 text-volt" />
          <span>
            <span className="label-mono block text-[8px] text-paper/35">Basé à</span>
            <span className="mt-0.5 block text-sm font-medium text-paper">{contact.city}</span>
          </span>
        </div>
      </div>

      <div className="bg-volt p-5 text-paper">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="label-mono text-[8px] opacity-60">Disponibilité</div>
            <div className="mt-1.5 max-w-60 font-display text-[22px] uppercase leading-none">{identity.availability}</div>
          </div>
          <Lightning filled className="h-5 w-5 shrink-0" />
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-paper/25 pt-3">
          <span className="label-mono text-[8px]">{identity.season}</span>
          <span className="label-mono flex items-center gap-1.5 text-[8px]">
            <Clock className="h-3 w-3" />
            {contact.responseTime}
          </span>
        </div>
      </div>
    </div>
  );
}
