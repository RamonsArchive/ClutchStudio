"use client";
import React, { useState, useMemo } from "react";
import { ProjectTemplate } from "@/types/GlobalTypes";
import { ProjectType } from "@/types/GlobalTypes";
import { X } from "lucide-react";
import ProjectGrid from "./ProjectGrid";
import Reveal from "./Reveal";

const AllProjects = ({
  projects,
}: {
  projects: readonly ProjectTemplate[];
}) => {
  const [selectedServiceType, setSelectedServiceType] = useState<string>("ALL");

  // Get unique service types from projects
  const serviceTypes = useMemo(() => {
    const types = projects.map((project) => project.projectType);
    return Array.from(new Set(types));
  }, [projects]);

  // Filter projects based on selected service type
  const filteredProjects = useMemo(() => {
    if (selectedServiceType === "ALL") {
      return projects;
    }
    return projects.filter(
      (project) => project.projectType === selectedServiceType
    );
  }, [selectedServiceType, projects]);

  // Handle service type selection
  const handleServiceTypeSelect = (serviceType: string) => {
    setSelectedServiceType(serviceType);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedServiceType("ALL");
  };

  // Get display name for service type
  const getServiceTypeDisplayName = (serviceType: string) => {
    if (serviceType === "ALL") return "All Projects";
    switch (serviceType) {
      case ProjectType.WEB_DEVELOPMENT:
        return "Web Development";
      case ProjectType.DATA_SCIENCE:
        return "Data Science";
      case ProjectType.AI_SOLUTIONS:
        return "AI Solutions";
      case ProjectType.OTHER:
        return "Other";
      default:
        return "All Projects";
    }
  };

  // How many projects sit behind each filter pill
  const getServiceTypeCount = (serviceType: string) => {
    if (serviceType === "ALL") return projects.length;
    return projects.filter((project) => project.projectType === serviceType)
      .length;
  };

  // Check if any filters are active
  const hasActiveFilters = selectedServiceType !== "ALL";

  const formatCount = (count: number) => String(count).padStart(2, "0");

  return (
    <div className="section-shell flex flex-col gap-8 md:gap-10 pt-12 md:pt-16">
      {/* Header Section */}
      <Reveal className="flex flex-col gap-4">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-secondary-400">01</span>
          <span className="h-px w-8 bg-white/20" />
          <span>Selected work</span>
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="heading-display max-w-3xl">
            {hasActiveFilters
              ? getServiceTypeDisplayName(selectedServiceType)
              : "All Projects"}
          </h2>
          <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-slate-400 whitespace-nowrap md:pb-2">
            Showing{" "}
            <span className="text-white">
              {formatCount(filteredProjects.length)}
            </span>{" "}
            / {formatCount(projects.length)}
          </p>
        </div>
        <p className="body-copy max-w-2xl">
          {hasActiveFilters
            ? `My ${getServiceTypeDisplayName(
                selectedServiceType
              ).toLowerCase()} work: what I built, how I built it, and why.`
            : "Full-stack products, data science, and machine learning. Pick a project to read the full case study."}
        </p>
      </Reveal>

      {/* Filter Section */}
      <div className="flex flex-col gap-4">
        <div className="rv-divider" />
        <div
          role="group"
          aria-label="Filter projects by type"
          className="flex flex-wrap items-center gap-2 md:gap-3"
        >
          {["ALL", ...serviceTypes].map((serviceType) => {
            const isActive = selectedServiceType === serviceType;
            return (
              <button
                key={serviceType}
                onClick={() => handleServiceTypeSelect(serviceType)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-funnel-sans text-[13px] md:text-[14px] font-semibold whitespace-nowrap transition-all duration-300 ease-out ${
                  isActive
                    ? "border-primary-500 bg-primary-500 text-primary-background-950 shadow-[0_8px_24px_-10px_rgba(35,196,225,0.7)]"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-primary-500/60 hover:text-white hover:-translate-y-0.5"
                }`}
              >
                {getServiceTypeDisplayName(serviceType)}
                <span
                  className={`font-mono text-[11px] md:text-[12px] ${
                    isActive
                      ? "text-primary-background-950/70"
                      : "text-slate-500"
                  }`}
                >
                  {formatCount(getServiceTypeCount(serviceType))}
                </span>
              </button>
            );
          })}

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 px-2 py-2 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-slate-400 transition-colors duration-300 hover:text-secondary-400"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <ProjectGrid
        filteredProjects={filteredProjects}
        clearFilters={clearFilters}
      />

      {/* Results Summary */}
      <p
        aria-live="polite"
        className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-slate-500 text-center pt-4"
      >
        {hasActiveFilters
          ? `Showing ${filteredProjects.length} of ${projects.length} total projects`
          : `Showing all ${projects.length} projects`}
      </p>
    </div>
  );
};

export default AllProjects;
