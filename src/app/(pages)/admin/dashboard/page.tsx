import React from "react";
import Image from "next/image";
import AdminDashboard from "@/components/AdminDashboard";
import { fetchDashboardData } from "@/lib/actions";
import Link from "next/link";
import { DashboardDataType } from "@/types/GlobalTypes";

const page = async () => {
  // fetch all projectTickets only
  const dashboardData = await fetchDashboardData();

  if (dashboardData.status === "ERROR") {
    return <div>Error: {dashboardData.error}</div>;
  }

  if (!dashboardData.data) {
    return <div>No data available</div>;
  }

  return (
    <div className="flex flex-col w-full h-full p-5 sm:p-10 bg-accent-950 gap-10 md:gap-20 pb-20">
      <div className="flex flex-col w-full h-full flex-center gap-5 p-5 sm:p-10 rounded-xl scrollbar-hide max-w-[1200px] mx-auto">
        <Link
          href="/"
          className="relative flex w-full flex-row flex-center max-w-[80%] md:max-w-[60%]"
        >
          <Image
            src="/Assets/Logos/webClutch1SVG.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-full h-full z-10"
          />
        </Link>
        <div className="flex flex-col gap-5">
          <h1 className="font-funnel-sans font-bold text-[24px] sm:text-[32px] md:text-[40px] text-white">
            Admin Dashboard
          </h1>
          <p className="font-funnel-sans font-medium text-[16px] sm:text-[18px] md:text-[20px] text-white">
            Welcome back, Admin!
          </p>
        </div>
      </div>
      <AdminDashboard dashboardData={dashboardData.data as DashboardDataType} />
    </div>
  );
};

export default page;
