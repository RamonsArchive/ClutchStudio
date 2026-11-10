"use client";
import React from "react";
import { DashboardDataType, ProjectStatus } from "@/types/GlobalTypes";
import ProjectTicketSection from "./ProjectTicketSection";

const AdminDashboard = ({
  dashboardData,
}: {
  dashboardData: DashboardDataType;
}) => {
  const projectTickets = dashboardData.projectTickets;

  // Quick counts shown above the ticket list
  const countByStatus = (status: ProjectStatus) =>
    projectTickets.filter((ticket) => ticket.status === status).length;

  const stats = [
    { id: "total", label: "Total tickets", value: projectTickets.length },
    {
      id: "unconfirmed",
      label: "Unconfirmed",
      value: countByStatus(ProjectStatus.UNCONFIRMED),
    },
    {
      id: "confirmed",
      label: "Confirmed",
      value: countByStatus(ProjectStatus.CONFIRMED),
    },
    {
      id: "in-progress",
      label: "In progress",
      value: countByStatus(ProjectStatus.IN_PROGRESS),
    },
  ];

  return (
    <div className="flex flex-col w-full h-full gap-6 md:gap-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="panel flex flex-col gap-2 p-4 md:p-5 min-w-0"
          >
            <p className="font-mono text-[10px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-slate-400">
              {stat.label}
            </p>
            <p
              className={`font-funnel-sans font-bold text-[28px] md:text-[36px] leading-none ${
                stat.id === "unconfirmed" && stat.value > 0
                  ? "text-secondary-400"
                  : "text-white"
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-row w-full gap-3 border-b border-white/10">
        <div className="flex flex-col flex-center -mb-px border-b-2 border-primary-500 pb-3">
          <button
            className="font-mono text-[12px] md:text-[13px] uppercase tracking-[0.18em] text-primary-300 cursor-default"
            disabled={true}
          >
            Project Tickets
          </button>
        </div>
      </div>
      <ProjectTicketSection projectTickets={projectTickets} />
    </div>
  );
};

export default AdminDashboard;
