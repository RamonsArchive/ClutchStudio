"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

export type AboutExperienceItem = {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
};

// The descriptions in src/constants are one long paragraph each.
// Split them into sentences here so they read as a list (constants stay untouched).
const splitIntoSentences = (text: string) =>
  text
    .split(/\.\s+(?=[A-Z])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .map((sentence) => (sentence.endsWith(".") ? sentence : `${sentence}.`));

const AboutExperience = ({
  experience,
}: {
  experience: AboutExperienceItem[];
}) => {
  const timelineRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduceMotion) return;

      // The rail fills in as you scroll through the timeline
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".about-exp-item").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: timelineRef }
  );

  return (
    <ol ref={timelineRef} className="relative flex flex-col gap-8 md:gap-10">
      {/* Rail */}
      <div className="pointer-events-none absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
      <div
        ref={progressRef}
        className="pointer-events-none absolute left-[7px] top-2 bottom-2 w-px origin-top bg-linear-to-b from-primary-500 to-secondary-500"
      />

      {experience.map((item, index) => {
        const [lead, ...points] = splitIntoSentences(item.description);
        return (
          <li
            key={`${item.company}-${index}`}
            className="about-exp-item relative pl-8 md:pl-12"
          >
            {/* Node on the rail */}
            <span className="absolute left-0 top-6 md:top-8 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-primary-500 bg-primary-background-950">
              <span
                className={`h-[5px] w-[5px] rounded-full ${
                  index === 0 ? "bg-secondary-500" : "bg-primary-500"
                }`}
              />
            </span>

            <SpotlightCard className="p-5 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-5 lg:gap-10">
                {/* Meta */}
                <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 lg:flex-col lg:items-start lg:gap-3">
                  <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-secondary-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-white">
                    {item.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-slate-400">
                    <MapPin className="h-3 w-3 text-primary-400" aria-hidden />
                    {item.location}
                  </span>
                </div>

                {/* Role */}
                <div className="flex min-w-0 flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-funnel-sans text-white text-[22px] md:text-[28px] font-bold leading-tight tracking-tight break-words">
                      {item.position}
                    </h3>
                    <p className="font-funnel-sans text-primary-300 text-[15px] md:text-[17px] font-medium break-words">
                      {item.company}
                    </p>
                  </div>

                  {lead && (
                    <p className="font-funnel-sans text-slate-200 text-[15px] md:text-[17px] leading-relaxed max-w-[65ch]">
                      {lead}
                    </p>
                  )}

                  {points.length > 0 && (
                    <ul className="flex flex-col gap-3 border-t border-white/10 pt-4 max-w-[65ch]">
                      {points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex gap-3">
                          <span className="mt-[9px] md:mt-[11px] h-1 w-1 flex-shrink-0 rounded-full bg-secondary-500" />
                          <span className="font-funnel-sans text-slate-300 text-[14px] md:text-[16px] leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </li>
        );
      })}
    </ol>
  );
};

export default AboutExperience;
