import React from "react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  footerContact,
  footerQuickLinks,
  navLinks,
  SiteData,
} from "@/constants";
import { pdfLinks, footerSocials, socialIcons } from "@/constants/links_index";

const footerMap = ["github", "linkedin", "instagram", "facebook"];

// Cached (cacheComponents is on): the footer is static apart from the year.
const Footer = async () => {
  "use cache";
  cacheLife("weeks");
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-primary-background-950">
      <div className="pointer-events-none absolute inset-0 rv-dot-grid opacity-50" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rv-glow-cyan" />

      {/* Call to action */}
      <div className="section-shell relative py-14 md:py-20">
        <div className="panel relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-6 md:p-10 overflow-hidden">
          <div className="flex flex-col gap-3 max-w-xl">
            <p className="eyebrow">Let&apos;s work together</p>
            <h2 className="font-funnel-sans text-white text-[28px] md:text-[38px] font-bold leading-[1.1] tracking-tight">
              Hiring an engineer, or need a website built and hosted?
            </h2>
            <div className="flex flex-wrap gap-3 pt-3">
              <Link href="/contact" className="btn-primary">
                Get in touch
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/services" className="btn-ghost">
                Web design &amp; hosting
              </Link>
            </div>
          </div>
          <Image
            src={SiteData.logos.beaver}
            alt="rvector beaver mascot coding on a laptop"
            width={1024}
            height={957}
            sizes="200px"
            className="hidden sm:block w-[150px] md:w-[190px] h-auto rv-float shrink-0"
          />
        </div>
      </div>

      {/* Link columns */}
      <div className="section-shell relative grid grid-cols-2 lg:grid-cols-4 gap-10 pb-14">
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
          <Link
            href="/"
            className="font-funnel-sans text-[24px] font-bold tracking-tight text-white w-fit"
          >
            rvector<span className="text-primary-400">.dev</span>
          </Link>
          <p className="font-funnel-sans text-slate-400 text-[14px] leading-relaxed max-w-xs">
            {SiteData.tagline}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
            {SiteData.location}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="eyebrow">Navigate</h3>
          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-funnel-sans text-slate-300 text-[14px] md:text-[15px] hover:text-primary-300 active:text-primary-300 transition-colors duration-300 ease-in-out cursor-pointer w-fit"
              >
                {link.name}
              </Link>
            ))}
            {footerQuickLinks
              .filter((link) => link.id !== "github")
              .map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  target={link.target}
                  rel={link.rel}
                  className="font-funnel-sans text-slate-300 text-[14px] md:text-[15px] hover:text-primary-300 active:text-primary-300 transition-colors duration-300 ease-in-out cursor-pointer w-fit"
                >
                  {link.title}
                </Link>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="eyebrow">Find me</h3>
          <div className="flex flex-col gap-2.5">
            {footerSocials
              .filter((link) => footerMap.includes(link.id))
              .map((link) => {
                const icon = socialIcons[link.id] || socialIcons.pdf;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 w-fit text-slate-300 hover:text-primary-300 active:text-primary-300 transition-colors duration-300 ease-in-out"
                    aria-label={link.ariaLabel}
                    title={link.title}
                  >
                    <span className="w-4 h-4 pointer-events-none [&>svg]:w-4 [&>svg]:h-4">
                      {icon}
                    </span>
                    <span className="font-funnel-sans text-[14px] md:text-[15px] pointer-events-none">
                      {link.title}
                    </span>
                  </Link>
                );
              })}
            {pdfLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                {...(link.download
                  ? { download: true }
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="group flex items-center gap-2.5 w-fit text-slate-300 hover:text-primary-300 active:text-primary-300 transition-colors duration-300 ease-in-out cursor-pointer"
                aria-label={link.ariaLabel}
                title={link.name}
              >
                <span className="w-4 h-4 pointer-events-none [&>svg]:w-4 [&>svg]:h-4">
                  {socialIcons.pdf}
                </span>
                <span className="font-funnel-sans text-[14px] md:text-[15px] pointer-events-none">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
          <h3 className="eyebrow">Contact</h3>
          <div className="flex flex-col gap-4">
            {footerContact.map((contact) => (
              <div key={contact.id} className="flex flex-col gap-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {contact.title}
                </p>
                <a
                  href={
                    contact.id === "email"
                      ? `mailto:${contact.value}`
                      : `tel:${contact.value}`
                  }
                  className="font-funnel-sans text-[14px] md:text-[15px] font-medium text-white hover:text-primary-300 active:text-primary-300 transition-colors duration-300 ease-in-out break-all cursor-pointer w-fit"
                >
                  {contact.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="section-shell flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-5">
          <p className="font-mono text-[10px] xs:text-[11px] uppercase tracking-[0.16em] text-slate-500">
            &copy; {new Date().getFullYear()} rvector.dev. All rights reserved.
          </p>
          <p className="font-mono text-[10px] xs:text-[11px] uppercase tracking-[0.16em] text-slate-500">
            <span className="text-secondary-400">&gt;_</span> Designed, built
            &amp; hosted by Ramon
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
