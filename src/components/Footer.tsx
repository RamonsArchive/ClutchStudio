import React from "react";
import Link from "next/link";
import Image from "next/image";
import { footerContact, footerQuickLinks, footerSocials } from "@/constants";

const Footer = () => {
  return (
    <>
      <section className="flex-center w-full bg-gradient-to-b from-accent-950 via-primary-900 to-black p-10 md:p-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-10 lg:gap-15 rounded-xl mx-auto">
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-5 w-full p-5 md:p-10 bg-primary-background-500/20 rounded-xl">
              <h1 className="font-funnel-sans text-white text-[32px] md:text-[38px] font-bold w-full">
                Socials
              </h1>
              <div className="flex flex-row sm:flex-col gap-5 w-full">
                {footerSocials.map((social) => (
                  <Link
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 hover:opacity-75 transition-opacity cursor-pointer"
                    aria-label={`Follow us on ${social.title}`}
                  >
                    <div className="relative w-6 h-6 sm:w-7 sm:h-7">
                      <Image
                        src={social.path}
                        fill
                        alt=""
                        sizes="10vw"
                        className="object-contain filter brightness-0 invert"
                      />
                    </div>
                    <span className="hidden text-[16px] md:text-[18px] font-medium sm:inline font-plex-sans text-sm text-white group-hover:text-primary-400 transition-colors">
                      {social.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 p-5 md:p-10 bg-primary-background-500/20 rounded-xl">
            <div className="flex flex-col gap-5">
              <h1 className="font-funnel-sans text-white text-[32px] md:text-[38px] font-bold w-full">
                Let&apos;s Connect
              </h1>
              <div className="flex flex-col gap-3 break-words">
                {footerContact.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex flex-col xl:flex-row gap-2 xl:items-center"
                  >
                    <h2 className="font-funnel-sans text-white text-[14px] md:text-[16px] font-light">
                      {contact.title}:
                    </h2>
                    <p className="font-funnel-sans text-[16px] md:text-[18px] font-medium text-white hover:text-primary-400 active:text-primary-400 transition-colors duration-300 ease-in-out break-words">
                      {contact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-5 md:p-10 bg-primary-background-500/20 rounded-xl">
            <div className="flex flex-col gap-5">
              <h1 className="font-funnel-sans text-white text-[32px] md:text-[38px] font-bold w-full">
                Quick Links
              </h1>
              <div className="flex flex-col gap-3">
                {footerQuickLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    target={link.target}
                    rel={link.rel}
                    className="text-white text-[16px] md:text-[18px] font-medium hover:text-primary-400 active:text-primary-400 transition-colors duration-300 ease-in-out cursor-pointer"
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
