import React from "react";
import Link from "next/link";
import { TermsOfService, SiteData } from "@/constants";
import TitleSection from "@/components/TitleSection";
import { ArrowLeft } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="flex flex-col w-full gap-10 md:gap-16 pb-20">
      <div className="relative grid min-h-[36dvh] w-full overflow-hidden">
        <TitleSection
          headerTitle={`${SiteData.domain} / Legal`}
          mainTitle={"Terms of Service"}
          includeBackgroundIcons={true}
          useCharsForMainTitle={true}
        />
      </div>

      <div className="section-shell">
        {/* Single readable column (max ~70 characters per line) */}
        <article className="flex flex-col gap-8 md:gap-10 w-full max-w-[70ch] font-funnel-sans text-[15px] md:text-[17px]">
          <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-slate-400">
            Last updated: 08/24/2025
          </p>

          <div className="flex flex-col w-full">
            {TermsOfService.map((term) => (
              <section
                key={term.id}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 border-t border-white/10 py-6 md:py-8"
              >
                <span className="font-mono text-[12px] md:text-[13px] tracking-[0.1em] text-secondary-400 pt-1 md:pt-1.5">
                  {String(term.id).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-y-3 min-w-0">
                  <h2 className="font-funnel-sans font-semibold text-[18px] sm:text-[20px] md:text-[22px] text-white leading-snug">
                    {term.title}
                  </h2>
                  <p className="font-funnel-sans text-[15px] md:text-[17px] text-slate-300 leading-relaxed break-words">
                    {term.content}
                  </p>
                </div>
              </section>
            ))}
          </div>

          <div className="flex flex-row flex-wrap gap-3">
            <Link href="/" className="btn-ghost group">
              <ArrowLeft
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                aria-hidden
              />
              Back to Home
            </Link>
            <Link href="/privacy" className="link-arrow px-3 py-3">
              Privacy Policy
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default TermsPage;
