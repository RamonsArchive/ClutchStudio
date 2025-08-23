"use client";
import React, { useMemo } from "react";
import { ProjectTicket, TicketStatus, ServiceType } from "@prisma/client";
import { ProjectStatus, ProjectType } from "@/types/GlobalTypes";
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
  projectTickets: ProjectTicket[];
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

  const tickets = useMemo<ProjectTicket[]>(() => {
    return projectTickets.filter((ticket) => {
      // Convert backend status to frontend status for filtering
      const frontendStatus =
        ticket.status === "PENDING"
          ? ProjectStatus.UNCONFIRMED
          : ticket.status === "IN_PROGRESS"
          ? ProjectStatus.IN_PROGRESS
          : ticket.status === "COMPLETED"
          ? ProjectStatus.COMPLETED
          : ticket.status === "ARCHIVED"
          ? ProjectStatus.ARCHIVED
          : ticket.status === "CANCELLED"
          ? ProjectStatus.CANCELLED
          : ProjectStatus.UNCONFIRMED;

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
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
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

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
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
    <div className="w-full h-full rounded-xl pt-5">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 pt-10">
        {tickets.map((ticket) => (
          <ProjectTicketCard key={ticket.id} projectTicket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default ProjectTicketSection;
