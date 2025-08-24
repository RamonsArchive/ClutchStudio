import Link from "next/link";
import React from "react";

const ViewProjectButton = ({
  href,
  ref,
}: {
  href: string;
  ref: React.RefObject<HTMLAnchorElement | null>;
}) => {
  return (
    <Link
      id="view-project-button"
      ref={ref}
      href={href}
      className="w-full max-w-sm text-center view-project-button-gradient font-funnel-sans text-white text-[12px] xs:text-[14px] font-medium px-4 py-2 rounded-lg transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:text-gray-500 active:text-gray-500"
    >
      View Project
    </Link>
  );
};

export default ViewProjectButton;
