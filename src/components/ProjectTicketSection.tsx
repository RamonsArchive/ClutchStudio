"use client";
import React, { useMemo } from "react";
import {
  ProjectStatus,
  ProjectType,
  ProjectTicketType,
} from "@/types/GlobalTypes";
import ProjectTicketCard from "./ProjectTicketCard";
import { useEffect, useState, useRef } from "react";
import {
  projectStatusOptionsAdmin,
  projectTypeOptionsAdmin,
} from "@/types/GlobalTypes";
import AdminFilters from "./AdminFilters";

interface ProjectStautsModified {
  value: ProjectStatus;
  title: string;
}
interface ProjectTypeModified {
  value: ProjectType;
  title: string;
}

const ProjectTicketSection = ({
  projectTickets,
}: {
  projectTickets: ProjectTicketType[];
}) => {
  const outerStatusRef = useRef<HTMLDivElement>(null);
  const innerStatusRef = useRef<HTMLDivElement>(null);
  const outerProjectTypeRef = useRef<HTMLDivElement>(null);
  const innerProjectTypeRef = useRef<HTMLDivElement>(null);

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isProjectTypeOpen, setIsProjectTypeOpen] = useState(false);

  const [statusFilters, setStatusFilters] = useState<ProjectStautsModified[]>(
    []
  );
  const [projectTypeFilters, setProjectTypeFilters] = useState<
    ProjectTypeModified[]
  >([]);

  const defaultStatus = [
    { value: ProjectStatus.UNCONFIRMED, title: "Unconfirmed" },
    { value: ProjectStatus.CONFIRMED, title: "Confirmed" },
    { value: ProjectStatus.IN_PROGRESS, title: "In Progress" },
  ];

  const tickets = useMemo<ProjectTicketType[]>(() => {
    return projectTickets.filter((ticket) => {
      // Status is already in frontend format
      const frontendStatus = ticket.status;

      // Convert backend service to frontend project type for filtering
      const frontendProjectType =
        ticket.service === "WEB_DEVELOPMENT"
          ? ProjectType.WEB_DEVELOPMENT
          : ticket.service === "DATA_SCIENCE"
            ? ProjectType.DATA_SCIENCE
            : ticket.service === "AI_SOLUTIONS"
              ? ProjectType.AI_SOLUTIONS
              : ProjectType.OTHER;

      if (statusFilters.length === 0 && projectTypeFilters.length === 0) {
        return defaultStatus.some((filter) => filter.value === frontendStatus);
      }
      if (statusFilters.length > 0 && projectTypeFilters.length === 0) {
        return statusFilters.some((filter) => filter.value === frontendStatus);
      }
      if (statusFilters.length === 0 && projectTypeFilters.length > 0) {
        return projectTypeFilters.some(
          (filter) =>
            filter.value === frontendProjectType &&
            defaultStatus.some((filter) => filter.value === frontendStatus)
        );
      }
      return (
        statusFilters.some((filter) => filter.value === frontendStatus) &&
        projectTypeFilters.some(
          (filter) => filter.value === frontendProjectType
        )
      );
    });
  }, [projectTickets, statusFilters, projectTypeFilters]);

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      const clickedOutsideStatus = outerStatusRef.current?.contains(
        e.target as Node
      );
      const clickedOutsideProjectType = outerProjectTypeRef.current?.contains(
        e.target as Node
      );
      const clickedInsideStatus = innerStatusRef.current?.contains(
        e.target as Node
      );
      const clickedInsideProjectType = innerProjectTypeRef.current?.contains(
        e.target as Node
      );

      if (!clickedOutsideStatus && !clickedInsideStatus) {
        setIsStatusOpen(false);
      } else if (clickedOutsideStatus && !clickedInsideStatus) {
        setIsStatusOpen((prev) => !prev);
      }

      if (!clickedOutsideProjectType && !clickedInsideProjectType) {
        setIsProjectTypeOpen(false);
      } else if (clickedOutsideProjectType && !clickedInsideProjectType) {
        setIsProjectTypeOpen((prev) => !prev);
      }
    };

    // pointerdown covers mouse and touch with a single event. Listening to
    // both mousedown and touchstart toggled the menu twice on phones.
    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  const updateStatusFilters = (value: string, title: string) => {
    setStatusFilters((prev) => {
      if (prev.some((filter) => filter.value === value)) {
        return prev.filter((filter) => filter.value !== value);
      }
      return [...prev, { value: value as ProjectStatus, title: title }];
    });
  };

  const updateProjectTypeFilters = (value: string, title: string) => {
    setProjectTypeFilters((prev) => {
      if (prev.some((filter) => filter.value === value)) {
        return prev.filter((filter) => filter.value !== value);
      }
      return [...prev, { value: value as ProjectType, title: title }];
    });
  };

  const resetFilters = () => {
    setStatusFilters([]);
    setProjectTypeFilters([]);
  };

  return (
    <div className="flex flex-col w-full h-full gap-5 md:gap-6">
      <AdminFilters
        titles={["Status", "Project Type"]}
        selectedFilters={[statusFilters, projectTypeFilters]}
        options={[projectStatusOptionsAdmin, projectTypeOptionsAdmin]}
        updateFilters={(value: string, title: string, filterIndex: number) => {
          if (filterIndex === 0) {
            updateStatusFilters(value, title);
          } else {
            updateProjectTypeFilters(value, title);
          }
        }}
        isOpen={[isStatusOpen, isProjectTypeOpen]}
        outerRef={[outerStatusRef, outerProjectTypeRef]}
        innerRef={[innerStatusRef, innerProjectTypeRef]}
        resetFilters={resetFilters}
      />

      <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-slate-400">
        Showing {tickets.length} of {projectTickets.length} tickets
        {statusFilters.length === 0 && (
          <span className="normal-case tracking-normal">
            {" "}
            (open statuses only: {defaultStatus.map((s) => s.title).join(", ")})
          </span>
        )}
      </p>

      {tickets.length === 0 ? (
        <div className="panel flex flex-col flex-center gap-2 p-8 md:p-12 text-center">
          <p className="font-funnel-sans font-semibold text-[16px] md:text-[18px] text-white">
            No tickets match these filters
          </p>
          <p className="font-funnel-sans text-[14px] md:text-[15px] text-slate-300">
            Change or reset the filters to see more tickets.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {tickets.map((ticket) => (
            <ProjectTicketCard key={ticket.id} projectTicket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectTicketSection;
