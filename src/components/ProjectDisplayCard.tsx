"use client";
import { ProjectTemplate } from "@/types/GlobalTypes";
import React, { useState } from "react";
import Link from "next/link";

const ProjectDisplayCard = ({
  project,
  "data-project-index": dataProjectIndex,
}: {
  project: ProjectTemplate;
  "data-project-index"?: number;
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const mainImage = project.images.mainImage;
  const id = project.id;
  const name = project.text.name;
  const subName = project.text.subName;

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    // Keep content visible for a moment after touch
    setTimeout(() => {
      setIsTouched(false);
    }, 3000);
  };

  return (
    <Link
      href={`/projects/${id}`}
      className="group relative flex-center w-full h-full border-1 border-white/50 rounded-lg overflow-hidden"
      data-project-index={dataProjectIndex}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={mainImage}
        alt={project.text.name}
        width={500}
        height={500}
        className="w-full h-full object-cover"
      />
      <div
        className={`absolute inset-0 w-full h-full bg-black/50 transition-opacity duration-300 ease-in-out flex items-end p-5 ${
          isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-white text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold">
            {name}
          </h2>
          <h3 className="text-white text-[14px] xs:text-[16px] font-light">
            {subName}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ProjectDisplayCard;
