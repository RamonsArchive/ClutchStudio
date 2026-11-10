import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteData } from "@/constants";

// rvector wordmark: beaver + "rvector.dev"
const RvectorLogo = ({ onClick }: { onClick?: () => void }) => (
  <Link
    href="/"
    onClick={onClick}
    aria-label="rvector.dev home"
    className="group flex items-center gap-2.5 h-full cursor-pointer"
  >
    <Image
      src={SiteData.logos.beaverSmall}
      alt="rvector beaver logo"
      width={256}
      height={239}
      priority
      className="h-9 w-auto transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110"
    />
    <span className="font-funnel-sans text-[20px] font-bold tracking-tight text-white leading-none">
      rvector<span className="text-primary-400">.dev</span>
    </span>
  </Link>
);

export default RvectorLogo;
