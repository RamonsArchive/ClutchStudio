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

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.UNCONFIRMED:
        return "bg-yellow-100 text-yellow-800";
      case ProjectStatus.CONFIRMED:
        return "bg-blue-100 text-blue-800";
      case ProjectStatus.IN_PROGRESS:
        return "bg-purple-100 text-purple-800";
      case ProjectStatus.COMPLETED:
        return "bg-green-100 text-green-800";
      case ProjectStatus.ARCHIVED:
        return "bg-gray-100 text-gray-800";
      case ProjectStatus.CANCELLED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {projectTicket.firstName} {projectTicket.lastName}
          </h3>
          <p className="text-sm text-gray-600">{projectTicket.organization}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              projectStatus
            )}`}
          >
            {PROJECT_STATUS_LABELS[projectStatus]}
          </span>
          <select
            name="projectStatus"
            id="projectStatus"
            className="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Service:</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
            {getServiceDisplay(projectTicket.service)}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Contact:</span>
          <span className="text-sm text-gray-600">{projectTicket.email}</span>
        </div>

        {projectTicket.phoneNumber && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Phone:</span>
            <span className="text-sm text-gray-600">
              {projectTicket.phoneNumber}
            </span>
          </div>
        )}

        <div>
          <span className="text-sm font-medium text-gray-700">Message:</span>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">
            {projectTicket.message}
          </p>
        </div>

        {projectTicket.adminNotes && (
          <div>
            <span className="text-sm font-medium text-gray-700">
              Admin Notes:
            </span>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {projectTicket.adminNotes}
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500 pt-2 border-t">
          Created: {new Date(projectTicket.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ProjectTicketCard;
