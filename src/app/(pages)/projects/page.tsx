import React from "react";
import { Projects } from "@/constants";
import TitleSection from "@/components/TitleSection";
import RecentProjectCard from "@/components/RecentProjectCard";
import ProjectDisplayCard from "@/components/ProjectDisplayCard";

const page = () => {
  return (
    <section className="flex flex-col w-[100dvw] h-full pb-20">
      <div className="flex flex-col h-[calc(100vh-43px)] w-full overflow-hidden">
        <TitleSection
          mainTitle={
            <>
              <span className="font-bold">Projects</span>
            </>
          }
          mainTitleClassName="font-funnel-sans text-white text-[58px] xs:text-[68px] sm:text-[78px] md:text-[84px] lg:text-[100px] font-bold break-words"
          includeBackgroundIcons={true}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
        {Projects.map((project, index) => (
          <ProjectDisplayCard key={index} />
        ))}
      </div>
    </section>
  );
};

export default page;
