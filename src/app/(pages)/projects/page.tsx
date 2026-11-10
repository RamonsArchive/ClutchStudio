import React from "react";
import { Projects } from "@/constants";
import TitleSection from "@/components/TitleSection";
import AllProjects from "@/components/AllProjects";

const page = () => {
  return (
    <section className="flex flex-col w-full h-full pb-20 md:pb-28">
      <div className="relative grid min-h-[42dvh] w-full overflow-hidden">
        <TitleSection
          headerTitle="Index / Projects"
          mainTitle={
            <>
              <span className="font-bold">Projects</span>
            </>
          }
          subTitle="Things I've designed, built, and shipped, from production platforms to research."
          mainTitleClassName="text-[52px] xs:text-[60px] md:text-[76px] lg:text-[92px]"
          includeBackgroundIcons={true}
          useCharsForMainTitle={true}
        />
      </div>
      <AllProjects projects={Projects} />
    </section>
  );
};

export default page;
