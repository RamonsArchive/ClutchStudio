"use client";
import React, { useState } from "react";
import {
  ProjectStatus,
  PROJECT_STATUS_LABELS,
  PROJECT_TYPE_LABELS,
  ProjectTicketType,
} from "@/types/GlobalTypes";
import { updateProjectStatus } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  projectTicket: ProjectTicketType;
}

const ProjectTicketCard = ({ projectTicket }: Props) => {
  const router = useRouter();
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>(() => {
    // Status is already in frontend format
    return projectTicket.status;
  });

  const getServiceDisplay = (service: string) => {
    switch (service) {
      case "WEB_DEVELOPMENT":
        return PROJECT_TYPE_LABELS.WEB_DEVELOPMENT;
      case "DATA_SCIENCE":
        return PROJECT_TYPE_LABELS.DATA_SCIENCE;
      case "AI_SOLUTIONS":
        return PROJECT_TYPE_LABELS.AI_SOLUTIONS;
      case "OTHER":
        return PROJECT_TYPE_LABELS.OTHER;
      default:
        return service;
    }
  };

  const handleProjectStatusChange = async (
    id: string,
    status: ProjectStatus
  ) => {
    try {
      const prevStatus = projectStatus;
      setProjectStatus(status);

      const response = await updateProjectStatus(id, status);

      if (response.status === "ERROR") {
        toast.error("ERROR", {
          description: response.error,
        });
        setProjectStatus(prevStatus);
        return;
      }

      toast.success("SUCCESS", {
        description: "Project status updated successfully",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("ERROR", {
        description: "Failed to update project status",
      });
      // Revert to previous status on error
      setProjectStatus(projectStatus);
    }
  };

  // Status badge colours: rvector tokens only (orange = needs attention,
  // cyan = active, slate = done/archived, red = cancelled)
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.UNCONFIRMED:
        return "border-secondary-400/50 bg-secondary-500/15 text-secondary-300";
      case ProjectStatus.CONFIRMED:
        return "border-primary-500/50 bg-primary-500/10 text-primary-300";
      case ProjectStatus.IN_PROGRESS:
        return "border-primary-500 bg-primary-500 text-primary-background-950";
      case ProjectStatus.COMPLETED:
        return "border-white/30 bg-white/15 text-white";
      case ProjectStatus.ARCHIVED:
        return "border-white/10 bg-white/5 text-slate-400";
      case ProjectStatus.CANCELLED:
        return "border-red-400/40 bg-red-400/10 text-red-400";
      default:
        return "border-white/10 bg-white/5 text-slate-400";
    }
  };

  const fieldLabelClassName =
    "font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-slate-400";

  return (
    <div className="panel flex flex-col gap-4 p-4 md:p-5 min-w-0 transition-colors duration-300 hover:border-primary-500/40">
      <div className="flex flex-row justify-between items-start gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="font-funnel-sans text-[17px] md:text-[18px] font-semibold text-white leading-snug break-words">
            {projectTicket.firstName} {projectTicket.lastName}
          </h3>
          {projectTicket.organization && (
            <p className="font-funnel-sans text-[13px] md:text-[14px] text-slate-300 break-words">
              {projectTicket.organization}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 px-2.5 py-1 rounded-full border font-mono text-[10px] sm:text-[11px] font-medium whitespace-nowrap ${getStatusColor(
            projectStatus
          )}`}
        >
          {PROJECT_STATUS_LABELS[projectStatus]}
        </span>
      </div>

      <div className="flex flex-row flex-wrap items-center gap-2">
        <span className="chip">{getServiceDisplay(projectTicket.service)}</span>
        <span className="font-mono text-[11px] md:text-[12px] text-slate-400">
          Created: {new Date(projectTicket.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className={fieldLabelClassName}>Contact:</span>
          <a
            href={`mailto:${projectTicket.email}`}
            className="font-funnel-sans text-[14px] md:text-[15px] text-primary-300 break-all underline decoration-primary-500/40 underline-offset-4 transition-colors duration-300 hover:text-white"
          >
            {projectTicket.email}
          </a>
        </div>

        {projectTicket.phoneNumber && (
          <div className="flex flex-col gap-1 min-w-0">
            <span className={fieldLabelClassName}>Phone:</span>
            <a
              href={`tel:${projectTicket.phoneNumber}`}
              className="font-funnel-sans text-[14px] md:text-[15px] text-slate-200 w-fit transition-colors duration-300 hover:text-white"
            >
              {projectTicket.phoneNumber}
            </a>
          </div>
        )}

        <div className="flex flex-col gap-1 min-w-0">
          <span className={fieldLabelClassName}>Message:</span>
          <p className="font-funnel-sans text-[14px] md:text-[15px] text-slate-200 leading-relaxed whitespace-pre-wrap break-words">
            {projectTicket.message}
          </p>
        </div>

        {projectTicket.adminNotes && (
          <div className="flex flex-col gap-1 min-w-0">
            <span className={fieldLabelClassName}>Admin Notes:</span>
            <p className="font-funnel-sans text-[14px] md:text-[15px] text-slate-300 leading-relaxed whitespace-pre-wrap break-words">
              {projectTicket.adminNotes}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 border-t border-white/10 pt-4 mt-auto">
        <label
          htmlFor={`projectStatus-${projectTicket.id}`}
          className={fieldLabelClassName}
        >
          Update status
        </label>
        <select
          name="projectStatus"
          id={`projectStatus-${projectTicket.id}`}
          className="w-full min-h-[44px] rounded-xl border border-white/15 bg-primary-background-950 px-3 py-2 font-funnel-sans text-[14px] text-slate-100 [color-scheme:dark] cursor-pointer outline-none transition-colors duration-200 hover:border-white/30 focus:border-primary-500"
          value={projectStatus}
          onChange={(e) =>
            handleProjectStatusChange(
              projectTicket.id,
              e.target.value as ProjectStatus
            )
          }
        >
          <option value={ProjectStatus.UNCONFIRMED}>Unconfirmed</option>
          <option value={ProjectStatus.CONFIRMED}>Confirmed</option>
          <option value={ProjectStatus.IN_PROGRESS}>In Progress</option>
          <option value={ProjectStatus.COMPLETED}>Completed</option>
          <option value={ProjectStatus.ARCHIVED}>Archived</option>
          <option value={ProjectStatus.CANCELLED}>Cancelled</option>
        </select>
      </div>
    </div>
  );
};

export default ProjectTicketCard;
