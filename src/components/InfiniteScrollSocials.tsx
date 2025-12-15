"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { allFooterLinks, socialIcons } from "@/constants/links_index";

// Type definitions for links
type SocialLink = {
  id: string;
  name: string;
  href: string;
  ariaLabel: string;
  title: string;
};

type PdfLink = SocialLink & {
  download: true;
};

type FooterLink = SocialLink | PdfLink;

// Type guard to check if a link is a PDF link
const isPdfLink = (link: FooterLink): link is PdfLink => {
  return "download" in link && link.download === true;
};

const InfiniteScrollSocials = ({
  direction = "left",
}: {
  direction?: "left" | "right";
}) => {
  const firstSetRef = useRef<HTMLDivElement>(null);
  const secondSetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const measureWidth = () => {
      requestAnimationFrame(() => {
        if (
          firstSetRef.current &&
          secondSetRef.current &&
          containerRef.current
        ) {
          const firstSetLeft = firstSetRef.current.offsetLeft;
          const secondSetLeft = secondSetRef.current.offsetLeft;
          const distance = secondSetLeft - firstSetLeft;
          setScrollDistance(direction === "left" ? -distance : distance);
        }
      });
    };

    const timeoutId = setTimeout(measureWidth, 100);
    window.addEventListener("resize", measureWidth);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", measureWidth);
    };
  }, [direction, allFooterLinks]);

  return (
    <div className="flex items-center justify-center overflow-hidden w-full min-w-0 py-4 min-h-[80px]">
      <div
        ref={containerRef}
        className="flex flex-row gap-10 relative items-center"
        style={
          {
            animation: scrollDistance
              ? `scroll-${direction} ${20}s linear infinite`
              : "none",
            "--scroll-distance": `${Math.abs(scrollDistance)}px`,
          } as React.CSSProperties & { "--scroll-distance": string }
        }
      >
        {/* First set of social icons */}
        <div ref={firstSetRef} className="flex items-center gap-10 shrink-0">
          {allFooterLinks.map((social, idx) => {
            const icon = socialIcons[social.id] || socialIcons.pdf;
            if (!icon) return null;
            // Clone the icon and override className to fill container
            const scaledIcon = React.cloneElement(
              icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
              {
                className: "w-full h-full",
              }
            );
            const isPdf = isPdfLink(social);
            const isPdfLinkForLabel =
              social.id === "resume" || social.id === "research_paper1";
            return (
              <Link
                key={`first-${idx}`}
                href={social.href}
                target={social.id === "gmail" || isPdf ? undefined : "_blank"}
                rel={
                  social.id === "gmail" || isPdf
                    ? undefined
                    : "noopener noreferrer"
                }
                {...(isPdf ? { download: true } : {})}
                className="shrink-0 text-white opacity-70 active:opacity-100 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1 w-10 h-10 sm:w-16 sm:h-16"
                aria-label={social.ariaLabel}
                title={social.title}
              >
                <div className="w-full h-full text-white flex items-center justify-center pointer-events-none">
                  {scaledIcon}
                </div>
                {isPdfLinkForLabel && (
                  <span className="text-[8px] xs:text-[10px] sm:text-[11px] text-white/80 font-medium pointer-events-none leading-none">
                    {social.title}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Duplicate sets for seamless loop */}
        <div ref={secondSetRef} className="flex items-center gap-10 shrink-0">
          {allFooterLinks.map((social, idx) => {
            const icon = socialIcons[social.id] || socialIcons.pdf;
            if (!icon) return null;
            const scaledIcon = React.cloneElement(
              icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
              {
                className: "w-full h-full",
              }
            );
            const isPdf = isPdfLink(social);
            const isPdfLinkForLabel =
              social.id === "resume" || social.id === "research_paper1";
            return (
              <Link
                key={`second-${idx}`}
                href={social.href}
                target={social.id === "gmail" || isPdf ? undefined : "_blank"}
                rel={
                  social.id === "gmail" || isPdf
                    ? undefined
                    : "noopener noreferrer"
                }
                {...(isPdf ? { download: true } : {})}
                className="shrink-0 text-white opacity-70 active:opacity-100 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1 w-10 h-10 sm:w-16 sm:h-16"
                aria-label={social.ariaLabel}
                title={social.title}
              >
                <div className="w-full h-full text-white flex items-center justify-center pointer-events-none">
                  {scaledIcon}
                </div>
                {isPdfLinkForLabel && (
                  <span className="text-[8px] xs:text-[10px] sm:text-[11px] text-white/80 font-medium pointer-events-none leading-none">
                    {social.title}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Third duplicate set */}
        <div className="flex items-center gap-10 shrink-0">
          {allFooterLinks.map((social, idx) => {
            const icon = socialIcons[social.id] || socialIcons.pdf;
            if (!icon) return null;
            const scaledIcon = React.cloneElement(
              icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
              {
                className: "w-full h-full",
              }
            );
            const isPdf = isPdfLink(social);
            const isPdfLinkForLabel =
              social.id === "resume" || social.id === "research_paper1";
            return (
              <Link
                key={`third-${idx}`}
                href={social.href}
                target={social.id === "gmail" || isPdf ? undefined : "_blank"}
                rel={
                  social.id === "gmail" || isPdf
                    ? undefined
                    : "noopener noreferrer"
                }
                {...(isPdf ? { download: true } : {})}
                className="shrink-0 text-white opacity-70 active:opacity-100 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1 w-10 h-10 sm:w-16 sm:h-16"
                aria-label={social.ariaLabel}
                title={social.title}
              >
                <div className="w-full h-full text-white flex items-center justify-center pointer-events-none">
                  {scaledIcon}
                </div>
                {isPdfLinkForLabel && (
                  <span className="text-[8px] xs:text-[10px] sm:text-[11px] text-white/80 font-medium pointer-events-none leading-none">
                    {social.title}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Fourth duplicate set */}
        <div className="xs:flex hidden items-center gap-10 shrink-0">
          {allFooterLinks.map((social, idx) => {
            const icon = socialIcons[social.id] || socialIcons.pdf;
            if (!icon) return null;
            const scaledIcon = React.cloneElement(
              icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
              {
                className: "w-full h-full",
              }
            );
            const isPdf = isPdfLink(social);
            const isPdfLinkForLabel =
              social.id === "resume" || social.id === "research_paper1";
            return (
              <Link
                key={`fourth-${idx}`}
                href={social.href}
                target={social.id === "gmail" || isPdf ? undefined : "_blank"}
                rel={
                  social.id === "gmail" || isPdf
                    ? undefined
                    : "noopener noreferrer"
                }
                {...(isPdf ? { download: true } : {})}
                className="shrink-0 text-white opacity-70 active:opacity-100 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center w-10 h-10 sm:w-16 sm:h-16"
                aria-label={social.ariaLabel}
                title={social.title}
              >
                <div className="w-full h-full text-white flex items-center justify-center pointer-events-none">
                  {scaledIcon}
                </div>
                {isPdfLinkForLabel && (
                  <span className="text-[8px] xs:text-[10px] sm:text-[11px] text-white/80 font-medium pointer-events-none leading-none">
                    {social.title}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Fifth duplicate set */}
        <div className="xs:flex hidden items-center gap-10 shrink-0">
          {allFooterLinks.map((social, idx) => {
            const icon = socialIcons[social.id] || socialIcons.pdf;
            if (!icon) return null;
            const scaledIcon = React.cloneElement(
              icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
              {
                className: "w-full h-full",
              }
            );
            const isPdf = isPdfLink(social);
            const isPdfLinkForLabel =
              social.id === "resume" || social.id === "research_paper1";
            return (
              <Link
                key={`fifth-${idx}`}
                href={social.href}
                target={social.id === "gmail" || isPdf ? undefined : "_blank"}
                rel={
                  social.id === "gmail" || isPdf
                    ? undefined
                    : "noopener noreferrer"
                }
                {...(isPdf ? { download: true } : {})}
                className="shrink-0 text-white opacity-70 active:opacity-100 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center w-10 h-10 sm:w-16 sm:h-16"
                aria-label={social.ariaLabel}
                title={social.title}
              >
                <div className="w-full h-full text-white flex items-center justify-center pointer-events-none">
                  {scaledIcon}
                </div>
                {isPdfLinkForLabel && (
                  <span className="text-[8px] xs:text-[10px] sm:text-[11px] text-white/80 font-medium pointer-events-none leading-none">
                    {social.title}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        {/* Sixth duplicate set */}
        <div className="hidden 2xl:flex items-center gap-10 shrink-0">
          {allFooterLinks.map((social, idx) => {
            const icon = socialIcons[social.id] || socialIcons.pdf;
            if (!icon) return null;
            const scaledIcon = React.cloneElement(
              icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
              {
                className: "w-full h-full",
              }
            );
            const isPdf = isPdfLink(social);
            return (
              <Link
                key={`sixth-${idx}`}
                href={social.href}
                target={social.id === "gmail" || isPdf ? undefined : "_blank"}
                rel={
                  social.id === "gmail" || isPdf
                    ? undefined
                    : "noopener noreferrer"
                }
                {...(isPdf ? { download: true } : {})}
                className="shrink-0 text-white opacity-70 active:opacity-100 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center w-10 h-10 sm:w-16 sm:h-16"
                aria-label={social.ariaLabel}
                title={social.title}
              >
                <div className="w-full h-full text-white flex items-center justify-center pointer-events-none">
                  {scaledIcon}
                </div>
              </Link>
            );
          })}
        </div>
        {/* Seventh duplicate set */}
        <div className="hidden 2xl:flex items-center gap-10 shrink-0">
          {allFooterLinks.map((social, idx) => {
            const icon = socialIcons[social.id] || socialIcons.pdf;
            if (!icon) return null;
            const scaledIcon = React.cloneElement(
              icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
              {
                className: "w-full h-full",
              }
            );
            const isPdf = isPdfLink(social);
            return (
              <Link
                key={`seventh-${idx}`}
                href={social.href}
                target={social.id === "gmail" || isPdf ? undefined : "_blank"}
                rel={
                  social.id === "gmail" || isPdf
                    ? undefined
                    : "noopener noreferrer"
                }
                {...(isPdf ? { download: true } : {})}
                className="shrink-0 text-white opacity-70 active:opacity-100 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center w-10 h-10 sm:w-16 sm:h-16"
                aria-label={social.ariaLabel}
                title={social.title}
              >
                <div className="w-full h-full text-white flex items-center justify-center pointer-events-none">
                  {scaledIcon}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollSocials;
