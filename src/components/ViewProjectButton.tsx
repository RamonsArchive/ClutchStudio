import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

const ViewProjectButton = ({ href }: { href: string }) => {
  return (
    <Link
      id="view-project-button"
      href={href}
      className="group btn-primary px-5 xs:px-6 text-[13px] xs:text-[14px] md:text-[15px] whitespace-nowrap"
    >
      View Project
      <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  );
};

export default ViewProjectButton;
