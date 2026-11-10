import Link from "next/link";
import React from "react";
import { ArrowUpRight, CodeXml } from "lucide-react";

const VisitButton = ({
  url,
  isWebsite,
}: {
  url: string;
  isWebsite: boolean;
}) => {
  // Nothing to link to (project has no live site and no repo)
  if (!url) return null;

  return (
    <Link
      id="visit-button"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group btn-secondary px-5 xs:px-6 text-[13px] xs:text-[14px] md:text-[15px] whitespace-nowrap"
    >
      {!isWebsite && <CodeXml className="w-4 h-4 shrink-0" />}
      {isWebsite ? "Visit Website" : "View Code"}
      <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
};

export default VisitButton;
