"use client";
import React from "react";
import ImageCarousel from "./ImageCarousel";
import { ProjectTemplate, ProjectTypes } from "@/types/GlobalTypes";
import VisitButton from "./VisitButton";
import ViewProjectButton from "./ViewProjectButton";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";
import { StatusIndicator } from "./ProjectDisplayCard";

const RecentProjectCard = ({
  project,
  index,
}: {
  project: ProjectTemplate;
  index: number;
}) => {
  const url = project.websiteUrl || project.githubUrl;
  const isWebsite = !!project.websiteUrl;
  const isEven = index % 2 === 0;

  const { name, title, workDescription } = project.text;
  const galleryImages = project.images.galleryImages;
  const displayTags = project.tags.slice(0, 4);
  const cardNumber = String(index + 1).padStart(2, "0");

  return (
    <Reveal className="w-full">
      {/* Mobile: image on top. Desktop: text and image swap sides on every other card. */}
      <SpotlightCard
        as="article"
        className={`flex flex-col w-full ${
          isEven ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Image side */}
        <div className="relative w-full md:w-1/2 shrink-0 h-[calc(56vw+64px)] min-h-[250px] max-h-[70dvh] md:h-auto md:max-h-none md:min-h-[440px]">
          <div className="absolute inset-0 p-2 md:p-3">
            <div className="w-full h-full rounded-2xl border border-white/10 overflow-hidden">
              <ImageCarousel images={galleryImages} />
            </div>
          </div>
        </div>

        {/* Text side */}
        <div className="flex flex-col justify-center w-full md:w-1/2 min-w-0 gap-4 md:gap-5 p-5 xs:p-6 md:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-secondary-400">{cardNumber}</span>
              <span className="h-px w-8 bg-white/20" />
              <span>{ProjectTypes[project.projectType]}</span>
            </p>
            <StatusIndicator status={project.status} />
          </div>

          <h3 className="font-funnel-sans text-white text-[28px] xs:text-[32px] md:text-[36px] lg:text-[42px] font-bold leading-[1.05] tracking-tight wrap-break-word">
            {name}
          </h3>

          <p className="font-funnel-sans text-slate-200 text-[15px] md:text-[17px] font-medium leading-snug">
            {title}
          </p>

          <p className="font-funnel-sans text-slate-400 text-[14px] md:text-[15px] leading-relaxed line-clamp-3 lg:line-clamp-4">
            {workDescription}
          </p>

          <div className="flex flex-wrap gap-2">
            {displayTags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons share the row; on very narrow screens they stack full-width */}
          <div className="flex flex-row flex-wrap gap-3 pt-2 md:pt-4 [&>a]:flex-1 sm:[&>a]:flex-none">
            <ViewProjectButton href={`/projects/${project.id}`} />
            <VisitButton url={url} isWebsite={isWebsite} />
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
};

export default RecentProjectCard;
