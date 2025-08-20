"use client";
import React from "react";
import { ProjectTemplate } from "@/types/GlobalTypes";
import VisitButton from "./VisitButton";
import { useRef } from "react";

const ProjectDetailsCard = ({ data }: { data: ProjectTemplate }) => {
  const { name, workDescription, personalDescription } = data.text;
  const tags = data.tags;
  const url = data.websiteUrl ? data.websiteUrl : data.githubUrl;
  const isWebsite = url ? true : false;
  const visitButtonRef = useRef<HTMLAnchorElement>(null);
  return (
    <div className="flex flex-col gap-6 bg-primary-100 rounded-xl p-6 shadow-lg w-full">
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-300/40">
        <div className="flex flex-col gap-2">
          <h3 className="font-funnel-sans text-gray-600 text-[14px] font-medium uppercase tracking-wide">
            Client
          </h3>
          <h1 className="font-funnel-sans text-black text-[28px] sm:text-[32px] font-bold leading-tight">
            {name}
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-4 pb-6 border-b border-gray-300/40">
        <h3 className="font-funnel-sans text-gray-600 text-[14px] font-medium uppercase tracking-wide">
          Services Provided
        </h3>

        <div className="flex flex-col lg:flex-row gap-3 flex-wrap">
          {tags.slice(0, 5).map((tag, index) => (
            <div key={index} className="tag-item flex items-center">
              <span className="font-funnel-sans text-black/80 text-[13px] xs:text-[14px] font-medium break-words px-3 py-1 bg-white/60 rounded-full border border-gray-200/50">
                {tag}
              </span>
              {index !== tags.slice(0, 3).length - 1 && (
                <span className="font-funnel-sans text-black/40 text-[12px] xs:text-[14px] font-light mx-2 xs:mx-3 break-words">
                  |
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col">
        <VisitButton url={url} isWebsite={isWebsite} ref={visitButtonRef} />
      </div>
    </div>
  );
};

export default ProjectDetailsCard;
