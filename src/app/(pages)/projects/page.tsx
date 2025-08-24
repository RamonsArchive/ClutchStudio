import React from "react";
import { Projects } from "@/constants";
import TitleSection from "@/components/TitleSection";
import AllProjects from "@/components/AllProjects";

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
      <AllProjects projects={Projects} />
    </section>
  );
};

export default page;
