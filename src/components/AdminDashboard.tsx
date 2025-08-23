"use client";
import React, { useState } from "react";
import { DashboardDataType } from "@/types/GlobalTypes";
import ProjectTicketSection from "./ProjectTicketSection";

const AdminDashboard = ({
  dashboardData,
}: {
  dashboardData: DashboardDataType;
}) => {
  const [mode] = useState<"projectTickets">("projectTickets");

  console.log(mode);
  console.log(dashboardData);

  return (
    <div className="flex flex-col w-full h-full gap-5 md:gap-20">
      <div className="flex flex-col md:flex-row w-full h-full gap-5">
        <div className="flex flex-col flex-center flex-1 rounded-xl p-5 bg-primary-500 no-pointer-events border-1 border-secondary-200/50 shadow-xl">
          <button
            className="font-funnel-sans font-bold text-[16px] w-full h-full sm:text-[20px] md:text-[24px] text-white cursor-default"
            disabled={true}
          >
            Project Tickets
          </button>
        </div>
      </div>
      <ProjectTicketSection projectTickets={dashboardData.projectTickets} />
    </div>
  );
};

export default AdminDashboard;
