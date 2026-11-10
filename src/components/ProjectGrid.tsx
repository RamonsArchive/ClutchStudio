import React, { useRef } from "react";
import ProjectDisplayCard from "./ProjectDisplayCard";
import { ProjectTemplate } from "@/types/GlobalTypes";
import { SearchX } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectGrid = ({
  filteredProjects,
  clearFilters,
}: {
  filteredProjects: readonly ProjectTemplate[];
  clearFilters: () => void;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Cards rise in with a stagger the first time the grid scrolls into view,
  // and again every time the filter changes.
  useGSAP(
    () => {
      const projectCards = gsap.utils.toArray<HTMLElement>(
        "[data-project-index]",
        gridRef.current
      );
      if (projectCards.length === 0) return;

      gsap.fromTo(
        projectCards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 92%",
            once: true,
          },
        }
      );
    },
    { scope: gridRef, dependencies: [filteredProjects], revertOnUpdate: true }
  );

  return (
    <>
      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div
          id="projects-grid"
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectDisplayCard
              data-project-index={index}
              key={project.id}
              project={project}
            />
          ))}
        </div>
      ) : (
        /* No Projects Found State */
        <div className="panel rv-dot-grid flex flex-col items-center text-center gap-4 px-5 py-16">
          <div className="flex-center w-14 h-14 rounded-full border border-white/10 bg-primary-background-800">
            <SearchX className="w-6 h-6 text-primary-400" />
          </div>
          <h3 className="font-funnel-sans text-white text-[20px] md:text-[24px] font-bold">
            No projects found
          </h3>
          <p className="font-funnel-sans text-slate-400 text-[14px] md:text-[16px] max-w-sm">
            Nothing in this category yet. Try another filter or browse
            everything.
          </p>
          <button onClick={clearFilters} className="btn-secondary mt-2">
            Show All Projects
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectGrid;
