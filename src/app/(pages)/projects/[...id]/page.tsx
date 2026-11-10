import ImageCarousel from "@/components/ImageCarousel";
import ProjectDetailsCard from "@/components/ProjectDetailsCard";
import ProjectTextCard from "@/components/ProjectTextCard";
import Reveal from "@/components/Reveal";
import TitleSection from "@/components/TitleSection";
import { ProjectPageMap, Projects } from "@/constants";
import { ProjectTemplate, ProjectTypes } from "@/types/GlobalTypes";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type ProjectPageParams = Promise<{ id: string[] | string }>;

// `[...id]` is a catch-all, so the id arrives as an array: /projects/relay -> ["relay"]
const getProject = (id: string[] | string): ProjectTemplate | undefined => {
  const projectId = Array.isArray(id) ? id.join("/") : id;
  return (ProjectPageMap as Record<string, ProjectTemplate>)[projectId];
};

export const generateStaticParams = () => {
  return Object.keys(ProjectPageMap).map((id) => ({ id: [id] }));
};

export const generateMetadata = async ({
  params,
}: {
  params: ProjectPageParams;
}): Promise<Metadata> => {
  const { id } = await params;
  const data = getProject(id);
  if (!data) return { title: "Project not found" };

  return {
    title: data.text.name,
    description: data.text.title,
  };
};

const ProjectPage = async ({ params }: { params: ProjectPageParams }) => {
  const { id } = await params;
  const data = getProject(id);

  if (!data) notFound();

  const images = data.images?.galleryImages ?? [];

  // Next project in the list (wraps back to the first)
  const projectIndex = Projects.findIndex((project) => project.id === data.id);
  const nextProject: ProjectTemplate =
    Projects[(projectIndex + 1) % Projects.length];

  return (
    <section className="flex flex-col w-full h-full pb-20 md:pb-28">
      <div className="relative grid min-h-[42dvh] w-full overflow-hidden">
        <TitleSection
          headerTitle={`Case study / ${ProjectTypes[data.projectType]}`}
          mainTitle={
            <>
              <span className="font-bold">{data.text.name}</span>
            </>
          }
          subTitle={data.text.subName}
          mainTitleClassName="wrap-break-word"
          includeBackgroundIcons={true}
        />
      </div>

      <div className="section-shell flex flex-col gap-14 md:gap-20 pt-8 md:pt-10">
        <div className="flex flex-col gap-8 md:gap-10">
          <Link href="/projects" className="group link-arrow w-fit">
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
            All projects
          </Link>

          <ProjectDetailsCard data={data} />
        </div>

        {/* Gallery */}
        {images.length > 0 && (
          <Reveal className="flex flex-col gap-6 md:gap-8">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-secondary-400">02</span>
              <span className="h-px w-8 bg-white/20" />
              <span>Gallery</span>
            </p>
            <div className="flex w-full h-[calc(56vw+48px)] min-h-[260px] max-h-[80dvh] lg:h-[650px] rounded-2xl border border-white/10 overflow-hidden">
              <ImageCarousel images={images} />
            </div>
          </Reveal>
        )}

        <ProjectTextCard data={data} />

        {/* Next project */}
        <Reveal>
          <Link
            href={`/projects/${nextProject.id}`}
            className="group panel rv-dot-grid flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 p-6 md:p-10 transition-colors duration-300 hover:border-primary-500/40"
          >
            <div className="flex flex-col gap-3 min-w-0">
              <p className="eyebrow">Next project</p>
              <h2 className="font-funnel-sans text-white text-[28px] xs:text-[32px] md:text-[44px] font-bold leading-[1.05] tracking-tight wrap-break-word transition-colors duration-300 group-hover:text-primary-300">
                {nextProject.text.name}
              </h2>
              <p className="font-funnel-sans text-slate-400 text-[14px] md:text-[16px] leading-relaxed">
                {nextProject.text.subName}
              </p>
            </div>
            <span className="flex-center shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary-500 text-white transition-all duration-300 ease-out group-hover:bg-secondary-400 group-hover:translate-x-1.5">
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default ProjectPage;
