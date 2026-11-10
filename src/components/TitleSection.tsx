"use client";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import ContactButton from "./ContactButton";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TitleSection = ({
  headerTitle,
  mainTitle,
  subTitle,
  headerClassName,
  mainTitleClassName,
  subTitleClassName,
  includeContactButton = false,
  includeBackgroundIcons = false,
  useCharsForMainTitle = false,
}: {
  headerTitle?: React.ReactNode;
  mainTitle: React.ReactNode;
  subTitle?: React.ReactNode;
  headerClassName?: string;
  mainTitleClassName?: string;
  subTitleClassName?: string;
  includeContactButton?: boolean;
  includeBackgroundIcons?: boolean; // shows the rvector beaver mascot
  useCharsForMainTitle?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerTitleRef = useRef<HTMLParagraphElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mainTitleElm = mainTitleRef.current;
      if (!mainTitleElm) return;

      const contactButtonElm = includeContactButton
        ? document.getElementById("contact-button")
        : null;

      const headerSplit = headerTitleRef.current
        ? SplitText.create(headerTitleRef.current, { type: "words" })
        : null;
      const mainSplit = SplitText.create(mainTitleElm, {
        type: useCharsForMainTitle ? "chars" : "words",
      });
      const subSplit = subTitleRef.current
        ? SplitText.create(subTitleRef.current, { type: "lines" })
        : null;

      const mainParts =
        (useCharsForMainTitle ? mainSplit.chars : mainSplit.words) || [];

      // Reveal the parents (they start `invisible` to prevent a flash)
      gsap.set(
        [headerTitleRef.current, mainTitleElm, subTitleRef.current].filter(
          Boolean
        ),
        { visibility: "visible" }
      );

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (headerSplit?.words) {
        tl.from(headerSplit.words, {
          opacity: 0,
          y: 12,
          duration: 0.5,
          stagger: 0.04,
        });
      }

      tl.from(
        mainParts,
        {
          opacity: 0,
          yPercent: 60,
          rotateX: -40,
          duration: 0.8,
          stagger: useCharsForMainTitle ? 0.025 : 0.06,
        },
        headerSplit ? "-=0.25" : 0
      );

      if (subSplit?.lines) {
        tl.from(
          subSplit.lines,
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 },
          "-=0.45"
        );
      }

      if (contactButtonElm) {
        tl.fromTo(
          contactButtonElm,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.3"
        );
      }

      if (mascotRef.current) {
        tl.from(
          mascotRef.current,
          {
            opacity: 0,
            x: 40,
            rotate: 8,
            duration: 0.9,
            ease: "back.out(1.4)",
          },
          0.2
        );

        // Mascot drifts up as you scroll past the header
        gsap.to(mascotRef.current, {
          yPercent: -35,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      return () => {
        tl.kill();
        mainSplit.revert();
        headerSplit?.revert();
        subSplit?.revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [
        headerTitle,
        mainTitle,
        subTitle,
        includeContactButton,
        includeBackgroundIcons,
        useCharsForMainTitle,
      ],
    }
  );

  return (
    <div
      id="title-container"
      ref={containerRef}
      className="relative flex w-full h-full overflow-hidden border-b border-white/10 bg-linear-to-b from-primary-background-900 via-primary-background-950 to-primary-background-950"
    >
      {/* Background: blueprint dots + soft brand glows */}
      <div className="pointer-events-none absolute inset-0 rv-dot-grid opacity-70" />
      <div className="pointer-events-none absolute -top-40 -left-32 h-[420px] w-[420px] rv-glow-cyan rv-drift" />
      <div className="pointer-events-none absolute -bottom-48 right-0 h-[460px] w-[460px] rv-glow-orange rv-drift-slow" />

      {/* Mascot */}
      {includeBackgroundIcons && (
        <div
          ref={mascotRef}
          className="pointer-events-none absolute -bottom-6 right-4 md:right-12 lg:right-24 w-[120px] xs:w-[140px] md:w-[200px] lg:w-[240px] opacity-25 md:opacity-90"
        >
          <Image
            src="/Assets/Logos/rvector/rvector_beaver.png"
            alt=""
            width={1024}
            height={957}
            sizes="(min-width: 1024px) 240px, (min-width: 768px) 200px, 140px"
            className="w-full h-auto rv-float"
            priority
          />
        </div>
      )}

      <div className="section-shell relative z-10 flex flex-col justify-center gap-5 md:gap-6 py-10 md:py-14">
        {headerTitle && (
          <p
            id="header-title"
            ref={headerTitleRef}
            className={`eyebrow ${headerClassName ?? ""} invisible`}
          >
            {headerTitle}
          </p>
        )}

        <h1
          id="main-title"
          ref={mainTitleRef}
          className={`heading-display max-w-4xl ${mainTitleClassName ?? ""} invisible`}
          style={{ perspective: 600 }}
        >
          {mainTitle}
        </h1>

        {subTitle && (
          <p
            id="sub-title"
            ref={subTitleRef}
            className={`body-copy max-w-2xl ${subTitleClassName ?? ""} invisible`}
          >
            {subTitle}
          </p>
        )}

        {includeContactButton && (
          <div className="pt-2">
            <ContactButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleSection;
