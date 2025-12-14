import React from "react";
import Link from "next/link";
import { footerContact, footerQuickLinks } from "@/constants";
import { pdfLinks, footerSocials, socialIcons } from "@/constants/links_index";

const footerMap = ["instagram", "linkedin", "facebook"];

const Footer = () => {
  return (
    <>
      <section className="flex-center w-full bg-linear-to-b from-accent-950 via-primary-950 to-black py-15 px-5 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-10 rounded-xl mx-auto">
          <div className="flex flex-col gap-5 w-full p-5 md:p-10 bg-primary-950/20 rounded-xl border border-primary-950">
            <h1 className="font-funnel-sans text-white text-[20px] md:text-[24px] font-bold w-full">
              Resume & Research
            </h1>
            <div className="flex flex-row items-center sm:items-start sm:flex-col gap-5 w-full h-fit">
              {pdfLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  {...(link.download
                    ? { download: true }
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  className="group flex items-center gap-2 text-white text-[14px] md:text-[16px] font-medium hover:text-primary-400 active:text-primary-400 transition-all duration-300 ease-in-out w-fit"
                  aria-label={link.ariaLabel}
                  title={link.title}
                  style={{ cursor: "pointer" }}
                >
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-primary-400 transition-colors duration-300 pointer-events-none">
                    {socialIcons.pdf}
                  </div>
                  <span className="hidden text-[16px] md:text-[18px] font-medium sm:inline font-plex-sans text-sm text-white group-hover:text-primary-400 transition-colors pointer-events-none">
                    {link.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-5 w-full p-5 md:p-10 bg-primary-950/20 rounded-xl border border-primary-950">
              <h1 className="font-funnel-sans text-white text-[20px] md:text-[24px] font-bold w-full">
                Socials
              </h1>
              <div className="flex flex-row items-center sm:items-start sm:flex-col gap-5 w-full h-fit">
                {footerSocials
                  .filter((link) => footerMap.includes(link.id))
                  .map((link) => {
                    const icon = socialIcons[link.id] || socialIcons.pdf;
                    return (
                      <Link
                        key={link.id}
                        href={link.href}
                        target={link.id === "gmail" ? undefined : "_blank"}
                        rel={
                          link.id === "gmail"
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="group flex items-center gap-2 w-fit hover:opacity-50 active:opacity-50 transition-opacity duration-300 ease-in-out"
                        aria-label={link.ariaLabel}
                        title={link.title}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="relative w-6 h-6 sm:w-7 sm:h-7 text-white pointer-events-none">
                          {icon}
                        </div>
                        <span className="hidden text-[14px] md:text-[16px] font-medium sm:inline font-plex-sans text-sm text-white group-hover:text-primary-400 transition-colors pointer-events-none">
                          {link.title}
                        </span>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 p-5 md:p-10 bg-primary-950/20 rounded-xl border border-primary-950">
            <div className="flex flex-col gap-5">
              <h1 className="font-funnel-sans text-white text-[20px] md:text-[24px] font-bold w-full">
                Let&apos;s Connect
              </h1>
              <div className="flex flex-col gap-3 wrap-break-words">
                {footerContact.map((contact) => (
                  <div key={contact.id} className="flex flex-col gap-2 ">
                    <h2 className="font-funnel-sans text-white text-[12px] md:text-[14px] font-light">
                      {contact.title}:
                    </h2>
                    <p className="font-funnel-sans text-[14px] md:text-[16px] font-medium text-white hover:text-primary-400 active:text-primary-400 transition-colors duration-300 ease-in-out wrap-break-words cursor-pointer w-fit">
                      {contact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-5 md:p-10 bg-primary-950/20 rounded-xl border border-primary-950">
            <div className="flex flex-col gap-5">
              <h1 className="font-funnel-sans text-white text-[20px] md:text-[24px] font-bold w-full">
                Quick Links
              </h1>
              <div className="flex flex-col gap-3">
                {footerQuickLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    target={link.target}
                    rel={link.rel}
                    className="text-white text-[14px] md:text-[16px] font-medium hover:text-primary-400 active:text-primary-400 transition-colors duration-300 ease-in-out cursor-pointer w-fit"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-2 w-full px-5 py-4 lg:px-10 lg:py-5 bg-black pt-4 border-t-[0.5px] border-slate-200/20">
        <p className="font-montserrat text-[8px] xs:text-[10px] font-normal text-white">
          &copy; {new Date().getFullYear()} Clutch Studio. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
