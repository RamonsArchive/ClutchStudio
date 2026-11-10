"use client";
import { ProjectTemplate, ProjectTypes } from "@/types/GlobalTypes";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// "2025-08-12" -> "Aug 2025" (parsed by hand so timezones can't shift the month)
export const formatProjectDate = (dateCompleted: string) => {
  const [year, month] = dateCompleted.split("-");
  const monthName = MONTHS[Number(month) - 1];
  return monthName ? `${monthName} ${year}` : year;
};

// Small status label shared by every project card:
// live = pulsing dot, in-progress = orange, archived = muted
export const StatusIndicator = ({
  status,
  className = "",
}: {
  status: ProjectTemplate["status"];
  className?: string;
}) => {
  if (status === "live") {
    return (
      <span
        className={`inline-flex items-center gap-2 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-slate-200 whitespace-nowrap ${className}`}
      >
        <span className="status-dot" />
        Live
      </span>
    );
  }

  if (status === "in-progress") {
    return (
      <span
        className={`inline-flex items-center gap-2 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-secondary-400 whitespace-nowrap ${className}`}
      >
        <span className="h-2 w-2 rounded-full bg-secondary-500" />
        In progress
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-slate-400 whitespace-nowrap ${className}`}
    >
      <span className="h-2 w-2 rounded-full bg-slate-500" />
      Archived
    </span>
  );
};

const ProjectDisplayCard = ({
  project,
  "data-project-index": dataProjectIndex,
}: {
  project: ProjectTemplate;
  "data-project-index"?: number;
}) => {
  const mainImage = project.images.mainImage;
  const id = project.id;
  const name = project.text.name;
  const subName = project.text.subName;
  const displayTags = project.tags.slice(0, 3);
  const cardNumber = String((dataProjectIndex ?? 0) + 1).padStart(2, "0");

  return (
    <Link
      href={`/projects/${id}`}
      className="group block h-full min-w-0 rounded-2xl"
      data-project-index={dataProjectIndex}
    >
      <SpotlightCard
        as="article"
        className="flex flex-col h-full group-hover:border-white/20"
      >
        {/* Image plate */}
        <div className="relative w-full aspect-16/10 overflow-hidden border-b border-white/10 bg-primary-background-800">
          <Image
            src={mainImage}
            alt={name}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary-background-950/70 via-transparent to-transparent" />
          <span className="absolute top-3 left-3 inline-flex items-center h-7 rounded-full border border-white/10 bg-primary-background-950/80 px-3 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-slate-300 backdrop-blur-sm">
            Plate Nº {cardNumber}
          </span>
          <span className="absolute top-3 right-3 inline-flex items-center h-7 rounded-full border border-white/10 bg-primary-background-950/80 px-3 backdrop-blur-sm">
            <StatusIndicator status={project.status} />
          </span>
        </div>

        {/* Text */}
        <div className="flex flex-col flex-1 gap-3 p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-primary-400 truncate">
              {ProjectTypes[project.projectType]}
            </p>
            <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-slate-500 whitespace-nowrap">
              {formatProjectDate(project.dateCompleted)}
            </p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[13px] md:text-[14px] text-secondary-400">
              {cardNumber}
            </span>
            <h2 className="font-funnel-sans text-white text-[22px] md:text-[24px] font-bold leading-tight tracking-tight wrap-break-word min-w-0">
              {name}
            </h2>
          </div>

          <p className="font-funnel-sans text-slate-400 text-[14px] md:text-[15px] leading-relaxed">
            {subName}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {displayTags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>

          <span className="link-arrow mt-auto pt-4 group-hover:text-white">
            View case study
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </SpotlightCard>
    </Link>
  );
};

export default ProjectDisplayCard;
