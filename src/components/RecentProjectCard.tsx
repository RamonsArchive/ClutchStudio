import React from "react";
import ImageCarousel from "./ImageCarousel";
import { ProjectTemplate } from "@/types/GlobalTypes";
import VisitButton from "./VisitButton";

const RecentProjectCard = ({ project }: { project: ProjectTemplate }) => {
  const { name, title, workDescription, personalDescription } = project.text;
  const { websiteUrl, githubUrl } = project;
  const url = websiteUrl ? websiteUrl : githubUrl;
  const isWebsite = websiteUrl ? true : false;
  const { galleryImages } = project.images;
  const tags = project.tags;
  return (
    <div className="flex flex-col gap-3 w-full pb-5 bg-accent-900 overflow-x-hidden">
      <div className="flex flex-col w-full h-[50dvh]">
        <ImageCarousel images={galleryImages} />
      </div>
      <div className="flex flex-col flex-1 w-full h-full px-5 py-3 gap-5 overflow-x-hidden">
        <h1 className="font-funnel-sans text-white text-[20px] xs:text-[24px] sm:text-[28px] md:text-[32px] lg:text-[48px] font-bold">
          {title}
        </h1>
        <div className="flex flex-row items-center">
          {tags.slice(0, 3).map((tag, index) => (
            <div key={index} className="flex items-center">
              <span className="font-funnel-sans text-white text-[12px] xs:text-[14px] font-extralight">
                {tag}
              </span>
              {index !== tags.slice(0, 3).length - 1 && (
                <span className="font-funnel-sans text-white/60 text-[12px] xs:text-[16px] font-extralight mx-3 xs:mx-5">
                  |
                </span>
              )}
            </div>
          ))}
        </div>
        <h2 className="font-funnel-sans text-white text-[12px] xs:text-[16px] font-regular">
          {workDescription}
        </h2>
        <VisitButton url={url} isWebsite={isWebsite} />
      </div>
    </div>
  );
};

export default RecentProjectCard;
