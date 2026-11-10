import TitleSection from "@/components/TitleSection";
import React from "react";
import { ContactData, SiteData } from "@/constants";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { Briefcase, LayoutTemplate, Server } from "lucide-react";

// Who the form is for (shown in the "what to expect" panel)
const contactReasons = [
  {
    id: "hiring",
    icon: Briefcase,
    title: "Hiring or collaborating",
    description:
      "A role, contract work, or a project that could use another engineer.",
  },
  {
    id: "website",
    icon: LayoutTemplate,
    title: "A new website",
    description: "Design and build for your business or organization.",
  },
  {
    id: "hosting",
    icon: Server,
    title: "Hosting for an existing business",
    description: "Already have a site? I can host it and keep it online.",
  },
] as const;

const ContactPage = () => {
  const title = ContactData.text.title;
  const subtitle = ContactData.text.subtitle;
  const subsubtitle = ContactData.text.subsubtitle;

  return (
    <section className="flex flex-col w-full h-full pb-20 gap-10 md:gap-16">
      <div className="relative grid min-h-[36dvh] w-full overflow-hidden">
        <TitleSection
          headerTitle={`${SiteData.domain} / Contact`}
          mainTitle={title}
          includeBackgroundIcons={true}
          useCharsForMainTitle={true}
        />
      </div>

      <div className="section-shell grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start gap-6 lg:gap-8">
        {/* Left: what to expect */}
        <Reveal className="min-w-0">
          <aside className="panel flex flex-col gap-6 md:gap-8 p-5 md:p-8">
            <div className="flex flex-col gap-3">
              <p className="eyebrow flex items-center gap-3">
                <span className="text-secondary-400">01</span>
                <span className="h-px w-8 bg-white/20" />
                <span>What to expect</span>
              </p>
              <h2 className="font-funnel-sans text-white text-[22px] md:text-[26px] font-bold leading-tight tracking-tight">
                Who this form is for
              </h2>
            </div>

            <ul className="flex flex-col gap-5">
              {contactReasons.map((reason) => (
                <li key={reason.id} className="flex flex-row items-start gap-4">
                  <span className="flex-center shrink-0 w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-primary-300">
                    <reason.icon className="w-[18px] h-[18px]" aria-hidden />
                  </span>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="font-funnel-sans text-white text-[15px] md:text-[16px] font-semibold leading-snug">
                      {reason.title}
                    </p>
                    <p className="font-funnel-sans text-slate-300 text-[14px] md:text-[15px] leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rv-divider" />

            <dl className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <dt className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-slate-400">
                  Email
                </dt>
                <dd className="min-w-0">
                  <a
                    href={`mailto:${SiteData.email}`}
                    className="font-funnel-sans text-primary-300 text-[15px] md:text-[16px] break-all underline decoration-primary-500/40 underline-offset-4 transition-colors duration-300 hover:text-white"
                  >
                    {SiteData.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-slate-400">
                  Based in
                </dt>
                <dd className="font-funnel-sans text-white text-[15px] md:text-[16px]">
                  {SiteData.location}
                </dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-slate-400">
                  Next step
                </dt>
                <dd className="font-funnel-sans text-slate-300 text-[14px] md:text-[15px] leading-relaxed">
                  Your message comes straight to me. If it looks like a fit,
                  I&apos;ll reply by email with a few questions or a time to
                  talk.
                </dd>
              </div>
            </dl>
          </aside>
        </Reveal>

        {/* Right: the form */}
        <div className="min-w-0">
          <ContactForm
            subtitle={subtitle}
            subsubtitle={subsubtitle}
            services={ContactData.services}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
