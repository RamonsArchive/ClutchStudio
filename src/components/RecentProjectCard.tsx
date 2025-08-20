import React from "react";
import ImageCarousel from "./ImageCarousel";
import { ProjectTemplate } from "@/types/GlobalTypes";
import VisitButton from "./VisitButton";

const RecentProjectCard = ({
  project,
  index,
}: {
  project: ProjectTemplate;
  index: number;
}) => {
  const { name, title, workDescription, personalDescription } = project.text;
  const { websiteUrl, githubUrl } = project;
  const url = websiteUrl ? websiteUrl : githubUrl;
  const isWebsite = websiteUrl ? true : false;
  const { galleryImages } = project.images;
  const tags = project.tags;
  const isEven = index % 2 === 0;

  const renderTags = () => {
    return (
      <div className="flex flex-row items-center">
        {tags.slice(0, 3).map((tag, index) => (
          <div key={index} className="tag-item">
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
    );
  };

  const renderDesktopTextContent = () => {
    return (
      <div className="flex flex-col w-full h-full gap-5 p-10">
        <h1
          id="recent-project-title"
          className="font-funnel-sans text-white text-[20px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-bold"
        >
          {title}
        </h1>
        {renderTags()}
        <h2
          id="recent-project-description"
          className="font-funnel-sans text-white text-[12px] xs:text-[16px] font-regular"
        >
          {workDescription}
        </h2>
        <VisitButton url={url} isWebsite={isWebsite} />
      </div>
    );
  };

  return (
    <>
      <div className="flex sm:hidden flex-col gap-3 w-full pb-5 bg-primary-background-900 overflow-x-hidden">
        <div className="flex flex-col w-full h-[50dvh]">
          <ImageCarousel images={galleryImages} />
        </div>
        <div className="flex flex-col flex-1 w-full h-full px-5 py-3 gap-5 overflow-x-hidden">
          <h1
            id="recent-project-title"
            className="font-funnel-sans text-white text-[20px] xs:text-[24px] sm:text-[28px] md:text-[32px]  font-bold"
          >
            {title}
          </h1>
          {renderTags()}
          <h2
            id="recent-project-description"
            className="font-funnel-sans text-white text-[12px] xs:text-[16px] font-regular"
          >
            {workDescription}
          </h2>
          <VisitButton url={url} isWebsite={isWebsite} />
        </div>
      </div>
      <div className="hidden sm:flex flex-row gap-3 w-full bg-primary-background-900 overflow-x-hidden">
        <div className="flex flex-col w-1/2">
          {isEven ? (
            renderDesktopTextContent()
          ) : (
            <ImageCarousel images={galleryImages} />
          )}
        </div>
        <div className="flex flex-col flex-1">
          {isEven ? (
            <ImageCarousel images={galleryImages} />
          ) : (
            renderDesktopTextContent()
          )}
        </div>
      </div>
    </>
  );
};

export default RecentProjectCard;
