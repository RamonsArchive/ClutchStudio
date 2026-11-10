import React from "react";
import AdminDashboard from "@/components/AdminDashboard";
import { fetchDashboardData } from "@/lib/actions";
import Link from "next/link";
import Image from "next/image";
import { DashboardDataType } from "@/types/GlobalTypes";
import { SiteData } from "@/constants";
import { ArrowLeft } from "lucide-react";

const page = async () => {
  // fetch all projectTickets only
  const dashboardData = await fetchDashboardData();

  if (dashboardData.status === "ERROR") {
    return (
      <div className="section-shell flex flex-col min-h-[60dvh] justify-center py-16">
        <div className="panel flex flex-col gap-4 p-5 md:p-8 border-red-400/30">
          <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-red-400">
            Dashboard error
          </p>
          <p className="font-funnel-sans text-slate-200 text-[15px] md:text-[17px] leading-relaxed break-words">
            Error: {dashboardData.error}
          </p>
          <Link href="/admin/login" className="btn-ghost w-fit">
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  if (!dashboardData.data) {
    return (
      <div className="section-shell flex flex-col min-h-[60dvh] justify-center py-16">
        <div className="panel flex flex-col gap-4 p-5 md:p-8">
          <p className="eyebrow">Admin dashboard</p>
          <p className="font-funnel-sans text-slate-200 text-[15px] md:text-[17px] leading-relaxed">
            No data available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] rv-dot-grid opacity-60" />
      <div className="section-shell relative flex flex-col gap-8 md:gap-12 py-10 md:py-14 pb-20">
        <div className="flex flex-row items-center justify-between gap-5">
          <div className="flex flex-col gap-3 min-w-0">
            <p className="eyebrow">{SiteData.domain} / Admin</p>
            <h1 className="font-funnel-sans font-bold tracking-tight leading-[1.05] text-[30px] sm:text-[38px] md:text-[48px] text-white">
              Admin Dashboard
            </h1>
            <p className="font-funnel-sans text-[15px] md:text-[17px] text-slate-300 leading-relaxed">
              Welcome back, Admin!
            </p>
          </div>
          <Link
            href="/"
            aria-label={`${SiteData.domain} home`}
            className="shrink-0 w-[64px] sm:w-[88px] md:w-[110px]"
          >
            <Image
              src={SiteData.logos.beaver}
              alt={`${SiteData.name} logo`}
              width={1024}
              height={957}
              sizes="(min-width: 768px) 110px, 88px"
              className="w-full h-auto rv-float"
            />
          </Link>
        </div>
        <div className="rv-divider" />
        <AdminDashboard
          dashboardData={dashboardData.data as DashboardDataType}
        />
      </div>
    </div>
  );
};

export default page;
