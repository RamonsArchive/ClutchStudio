import React from "react";
import { Projects } from "@/constants";
import TitleSection from "@/components/TitleSection";
import RecentProjectCard from "@/components/RecentProjectCard";
import ProjectDisplayCard from "@/components/ProjectDisplayCard";

const page = () => {
  return (
    <section className="flex flex-col w-[100dvw] h-full pb-20 gap-10">
      <div className="relative flex flex-col h-[calc(50dvh-43px)] w-full overflow-hidden">
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
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-10 p-3 md:p-10">
        {Projects.map((project, index) => (
          <ProjectDisplayCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default page;
