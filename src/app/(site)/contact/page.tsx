import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/data/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ContactDetails } from "@/features/contact/ContactDetails";
import { ContactForm } from "@/features/contact/ContactForm";
import { ContactFormFromQuery } from "@/features/contact/ContactFormFromQuery";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contacter ${site.identity.pilotName} pour un partenariat, une question ou une visite sur la piste. ${site.contact.responseTime}.`,
};

export default function ContactPage() {
  const { contact, tiers } = site;
  const formProps = { to: contact.email, tiers, responseTime: contact.responseTime };

  return (
    <section className="section-dark relative overflow-hidden py-20 md:py-28">
      <div
        className="pointer-events-none absolute left-0 top-0 h-150 w-150 -translate-x-1/2 -translate-y-1/3 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,30,45,0.1) 0%, transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="wrap relative">
        <PageHeader
          title={
            <>
              {contact.titleA}
              <br />
              <span className="text-volt">{contact.titleB}</span>
            </>
          }
          aside={<p className="max-w-sm text-sm leading-relaxed text-paper/55">{contact.intro}</p>}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="relative z-20 lg:col-span-7">
            <div className="border border-paper/12 bg-carbon/70 p-5 md:p-7">
              <Suspense fallback={<ContactForm {...formProps} />}>
                <ContactFormFromQuery {...formProps} />
              </Suspense>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative z-10 lg:col-span-5">
            <ContactDetails />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
