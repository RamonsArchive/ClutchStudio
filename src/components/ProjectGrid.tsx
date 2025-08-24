import React from "react";
import ProjectDisplayCard from "./ProjectDisplayCard";
import { ProjectTemplate } from "@/types/GlobalTypes";
import { Filter } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectGrid = ({
  filteredProjects,
  clearFilters,
}: {
  filteredProjects: ProjectTemplate[];
  clearFilters: () => void;
}) => {
  useGSAP(() => {
    // create scroll trigger for all cards using a timeline with stagger
    const projectCards = document.querySelectorAll("[data-project-index]");

    const projectAnimationTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects-grid", // We'll add this ID to the grid container
        start: "top 95%",
        end: "top 30%",
        scrub: 1.5,
      },
    });

    // Add all cards to the timeline with stagger
    projectAnimationTL.fromTo(
      projectCards,
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        opacity: 1,
        yPercent: 0,
        ease: "power2.inOut",
        stagger: 0.05, // Small stagger between each card
      }
    );

    return () => {
      projectAnimationTL.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);
  return (
    <>
      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div
          id="projects-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
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
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-[#E2E8F0] rounded-full flex items-center justify-center">
            <Filter className="w-12 h-12 text-[#64748B]" />
          </div>
          <h3 className="text-xl font-semibold text-[#475569] mb-2">
            No projects found
          </h3>
          <p className="text-[#64748B] mb-6">
            Try adjusting your filters or browse all projects
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-[#008E1A] text-white rounded-xl hover:bg-[#007A17] transition-colors duration-200 font-medium"
          >
            Show All Projects
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectGrid;
