"use client";
import React from "react";
import { ProjectTemplate, ProjectTypes } from "@/types/GlobalTypes";
import { ArrowUpRight } from "lucide-react";
import VisitButton from "./VisitButton";
import Reveal from "./Reveal";
import { StatusIndicator, formatProjectDate } from "./ProjectDisplayCard";

// "https://www.modalai.com/x" -> "modalai.com"
const getLinkLabel = (url: string) => {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return host === "github.com" ? "GitHub" : host;
  } catch {
    return url;
  }
};

const ProjectDetailsCard = ({ data }: { data: ProjectTemplate }) => {
  const tags = data.tags;
  const url = data.websiteUrl ? data.websiteUrl : data.githubUrl;
  const isWebsite = !!data.websiteUrl;
  const isInProgress = data.status === "in-progress";

  const labelClassName =
    "font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-slate-500";
  const valueClassName =
    "font-funnel-sans text-white text-[15px] md:text-[17px] font-semibold leading-snug";
  const cellClassName =
    "flex flex-col gap-2 min-w-0 bg-primary-background-900 p-4 md:p-6";

  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-secondary-400">01</span>
          <span className="h-px w-8 bg-white/20" />
          <span>Overview</span>
        </p>
        <VisitButton url={url} isWebsite={isWebsite} />
      </Reveal>

      {/* Facts row */}
      <Reveal>
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl border border-white/10 bg-white/10 overflow-hidden">
          <div className={cellClassName}>
            <dt className={labelClassName}>Type</dt>
            <dd className={valueClassName}>{ProjectTypes[data.projectType]}</dd>
          </div>

          <div className={cellClassName}>
            <dt className={labelClassName}>
              {isInProgress ? "Timeline" : "Completed"}
            </dt>
            <dd className={valueClassName}>
              {isInProgress ? "Ongoing" : formatProjectDate(data.dateCompleted)}
            </dd>
          </div>

          <div className={cellClassName}>
            <dt className={labelClassName}>Status</dt>
            <dd className="flex items-center min-h-[22px] md:min-h-[24px]">
              <StatusIndicator status={data.status} />
            </dd>
          </div>

          <div className={cellClassName}>
            <dt className={labelClassName}>Links</dt>
            <dd className="flex flex-col gap-1.5 min-w-0">
              {data.websiteUrl && (
                <a
                  href={data.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 min-w-0 font-mono text-[12px] md:text-[13px] text-primary-300 transition-colors duration-300 hover:text-white"
                >
                  <span className="truncate">
                    {getLinkLabel(data.websiteUrl)}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              {data.githubUrl && (
                <a
                  href={data.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 min-w-0 font-mono text-[12px] md:text-[13px] text-primary-300 transition-colors duration-300 hover:text-white"
                >
                  <span className="truncate">
                    {getLinkLabel(data.githubUrl)}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              {!data.websiteUrl && !data.githubUrl && (
                <span className="font-mono text-[12px] md:text-[13px] text-slate-500">
                  Private
                </span>
              )}
            </dd>
          </div>
        </dl>
      </Reveal>

      {/* Tag chips */}
      <div className="flex flex-col gap-3">
        <p className={labelClassName}>
          {data.isClient ? "Services & stack" : "Stack"}
        </p>
        <Reveal stagger={0.03} y={12} className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </Reveal>
      </div>
    </div>
  );
};

export default ProjectDetailsCard;
