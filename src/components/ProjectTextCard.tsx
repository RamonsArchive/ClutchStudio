"use client";
import { ProjectTemplate } from "@/types/GlobalTypes";
import React from "react";
import Reveal from "./Reveal";

// Descriptions are one long string; a blank line ("\n\n") starts a new paragraph
const toParagraphs = (text: string) =>
  text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const ProjectTextCard = ({ data }: { data: ProjectTemplate }) => {
  const sections = [
    {
      index: "03",
      label: "The work",
      heading: "What I built",
      text: data.text.workDescription,
    },
    {
      index: "04",
      label: "The story",
      heading: "Why it mattered",
      text: data.text.personalDescription,
    },
  ].filter((section) => section.text);

  return (
    <div className="flex flex-col gap-12 md:gap-20 w-full">
      {/* Lead statement */}
      <Reveal className="flex flex-col gap-5">
        {/* Orange accent divider */}
        <div className="w-12 h-1 bg-secondary-500 rounded-full" />
        <h2 className="font-funnel-sans text-white text-[22px] xs:text-[24px] md:text-[32px] lg:text-[36px] font-bold leading-[1.2] tracking-tight max-w-4xl">
          {data.text.title}
        </h2>
      </Reveal>

      {sections.map((section) => (
        <Reveal
          key={section.index}
          className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)] gap-5 md:gap-10 border-t border-white/10 pt-8 md:pt-12"
        >
          <div className="flex flex-col gap-3 md:sticky md:top-24 md:self-start">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-secondary-400">{section.index}</span>
              <span className="h-px w-8 bg-white/20" />
              <span>{section.label}</span>
            </p>
            <h3 className="font-funnel-sans text-white text-[24px] md:text-[28px] font-bold leading-tight tracking-tight">
              {section.heading}
            </h3>
          </div>

          <div className="flex flex-col gap-5 max-w-[70ch]">
            {toParagraphs(section.text).map((paragraph, i) => (
              <p
                key={i}
                className="font-funnel-sans text-slate-300 text-[15px] md:text-[17px] leading-[1.75]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
};

export default ProjectTextCard;
