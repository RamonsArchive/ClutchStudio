"use client";
import { ProjectTemplate } from "@/types/GlobalTypes";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const ProjectTextCard = ({ data }: { data: ProjectTemplate }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const personalDescriptionRef = useRef<HTMLParagraphElement>(null);
  const accentDividerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const titleSplit = SplitText.create(titleRef.current, {
      type: "words",
    });

    const personalDescriptionSplit = SplitText.create(
      personalDescriptionRef.current,
      {
        type: "words",
      }
    );

    gsap.from(titleSplit.words, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      opacity: 0,
      yPercent: -100,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.from(personalDescriptionSplit.words, {
      scrollTrigger: {
        trigger: personalDescriptionRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      opacity: 0,
      yPercent: -100,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.from(accentDividerRef.current, {
      scrollTrigger: {
        trigger: accentDividerRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      opacity: 0,
      yPercent: -100,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [titleRef, personalDescriptionRef, accentDividerRef]);

  return (
    <div className="flex flex-col gap-6 bg-primary-background-900 rounded-xl p-6 shadow-lg">
      <h2
        ref={titleRef}
        className="font-funnel-sans text-white text-[28px] sm:text-[32px] font-bold leading-tight"
      >
        {data.text.title}
      </h2>

      {/* Purple accent divider */}
      <div
        ref={accentDividerRef}
        className="w-18 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full shadow-sm"
      ></div>

      <p
        ref={personalDescriptionRef}
        className="font-funnel-sans text-gray-100 text-[15px] sm:text-[16px] font-light leading-relaxed max-w-2xl"
      >
        {data.text.personalDescription}
      </p>
    </div>
  );
};

export default ProjectTextCard;
