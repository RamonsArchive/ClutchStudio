import React from "react";
import { AboutData } from "@/constants";
import TitleSection from "@/components/TitleSection";
import AboutContent from "@/components/AboutContent";

const page = () => {
  const title = AboutData.text.title;
  const subtitle = AboutData.text.subtitle;
  const images = AboutData.images;
  const education = AboutData.text.education;
  const introduction = AboutData.text.introduction;
  const releventCoursework = AboutData.text.releventCoursework;
  const technicalSkills = AboutData.text.technical_skills;
  const favoriteTools = AboutData.text.favoriteTools;
  return (
    <section className="flex flex-col w-[100dvw] h-full pb-15 gap-10">
      <div className="relative flex flex-col h-[calc(50dvh-43px)] w-full overflow-hidden">
        <TitleSection
          mainTitle={title}
          mainTitleClassName="font-funnel-sans text-white text-[58px] xs:text-[68px] sm:text-[78px] md:text-[84px] lg:text-[100px] font-bold break-words"
          includeBackgroundIcons={true}
          useCharsForMainTitle={true}
        />
      </div>
      <AboutContent
        subtitle={subtitle}
        introduction={introduction}
        education={education}
        releventCoursework={releventCoursework}
        favoriteTools={favoriteTools}
        technicalSkills={technicalSkills}
        images={images}
      />
    </section>
  );
};

export default page;
