import React from "react";
import { AboutData, WorkExperienceData } from "@/constants";
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
  const workExperience = WorkExperienceData.text;
  return (
    <section className="flex flex-col w-full h-full">
      <div className="relative grid min-h-[42dvh] w-full overflow-hidden">
        <TitleSection
          headerTitle="rvector.dev / About"
          mainTitle={title}
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
        workExperience={workExperience}
      />
    </section>
  );
};

export default page;
