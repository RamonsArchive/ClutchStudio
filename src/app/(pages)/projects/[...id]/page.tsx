import ImageCarousel from "@/components/ImageCarousel";
import ProjectDetailsCard from "@/components/ProjectDetailsCard";
import ProjectTextCard from "@/components/ProjectTextCard";
import TitleSection from "@/components/TitleSection";
import { ProjectPageMap } from "@/constants";
import React from "react";

const ProjectPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = ProjectPageMap[id as keyof typeof ProjectPageMap];

  const images = data?.images?.galleryImages;

  return (
    <section className="flex flex-col w-[100dvw] h-full pb-15 gap-10">
      <div className="relative flex flex-col h-[calc(50dvh-43px)] w-full overflow-hidden">
        <TitleSection
          mainTitle={
            <>
              <span className="font-bold">{data.text.name}</span>
            </>
          }
          mainTitleClassName="font-funnel-sans text-white text-[50px] xs:text-[60px] sm:text-[70px] md:text-[80px] lg:text-[90px] font-bold break-words"
          includeBackgroundIcons={true}
        />
      </div>
      <div className="flex flex-col gap-10 md:gap-15 rounded-xl md:p-5 p-3 w-full">
        <div className="flex w-full h-[80vh]">
          <ImageCarousel images={images} />
        </div>
        <div className="flex flex-col md:flex-row gap-5 w-full">
          <div className="flex h-full  w-full md:w-1/2">
            <ProjectTextCard data={data} />
          </div>
          <div className="flex h-full w-full md:flex-1">
            <ProjectDetailsCard data={data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectPage;
