import Link from "next/link";
import React from "react";

const VisitButton = ({
  url,
  isWebsite,
  ref,
}: {
  url: string;
  isWebsite: boolean;
  ref: React.RefObject<HTMLAnchorElement | null>;
}) => {
  // Ensure URL is absolute (starts with http:// or https://)

  return (
    <Link
      id="visit-button"
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full max-w-sm text-center visit-button-gradient font-funnel-sans text-white text-[12px] xs:text-[14px] font-medium px-4 py-2 rounded-lg transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:text-gray-500 active:text-gray-500"
    >
      {isWebsite ? "Visit Website" : "View Code"}
    </Link>
  );
};

export default VisitButton;
