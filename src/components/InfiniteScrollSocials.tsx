"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { footerSocials, socialIcons } from "@/constants/links_index";

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
  }, [direction]);

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
          {footerSocials.map((social, idx) => {
            const icon = socialIcons[social.id];
            if (!icon) return null;
            return (
              <Link
                key={`first-${idx}`}
                href={social.href}
                target={social.id === "gmail" ? undefined : "_blank"}
                rel={social.id === "gmail" ? undefined : "noopener noreferrer"}
                className="shrink-0 text-white opacity-70 active:opacity-100 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20"
                aria-label={social.ariaLabel}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 text-white">
                  {icon}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Duplicate sets for seamless loop */}
        <div ref={secondSetRef} className="flex items-center gap-10 shrink-0">
          {footerSocials.map((social, idx) => {
            const icon = socialIcons[social.id];
            if (!icon) return null;
            return (
              <Link
                key={`second-${idx}`}
                href={social.href}
                target={social.id === "gmail" ? undefined : "_blank"}
                rel={social.id === "gmail" ? undefined : "noopener noreferrer"}
                className="shrink-0 text-white opacity-70 active:opacity-100 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20"
                aria-label={social.ariaLabel}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 text-white">
                  {icon}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Third duplicate set */}
        <div className="flex items-center gap-10 shrink-0">
          {footerSocials.map((social, idx) => {
            const icon = socialIcons[social.id];
            if (!icon) return null;
            return (
              <Link
                key={`third-${idx}`}
                href={social.href}
                target={social.id === "gmail" ? undefined : "_blank"}
                rel={social.id === "gmail" ? undefined : "noopener noreferrer"}
                className="shrink-0 text-white opacity-70 active:opacity-100 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20"
                aria-label={social.ariaLabel}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 text-white">
                  {icon}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Fourth duplicate set */}
        <div className="xs:flex hidden items-center gap-10 shrink-0">
          {footerSocials.map((social, idx) => {
            const icon = socialIcons[social.id];
            if (!icon) return null;
            return (
              <Link
                key={`fourth-${idx}`}
                href={social.href}
                target={social.id === "gmail" ? undefined : "_blank"}
                rel={social.id === "gmail" ? undefined : "noopener noreferrer"}
                className="shrink-0 text-white opacity-70 active:opacity-100 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20"
                aria-label={social.ariaLabel}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 text-white">
                  {icon}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Fifth duplicate set */}
        <div className="xs:flex hidden items-center gap-10 shrink-0">
          {footerSocials.map((social, idx) => {
            const icon = socialIcons[social.id];
            if (!icon) return null;
            return (
              <Link
                key={`fifth-${idx}`}
                href={social.href}
                target={social.id === "gmail" ? undefined : "_blank"}
                rel={social.id === "gmail" ? undefined : "noopener noreferrer"}
                className="shrink-0 text-white opacity-70 active:opacity-100 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20"
                aria-label={social.ariaLabel}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 text-white">
                  {icon}
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
