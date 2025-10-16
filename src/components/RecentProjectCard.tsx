"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageCarousel from "./ImageCarousel";
import { ProjectTemplate } from "@/types/GlobalTypes";
import VisitButton from "./VisitButton";
import ViewProjectButton from "./ViewProjectButton";

gsap.registerPlugin(SplitText, ScrollTrigger);

const RecentProjectCard = ({
  project,
  index,
}: {
  project: ProjectTemplate;
  index: number;
}) => {
  // Memoize derived values
  const { url, isWebsite, isEven } = useMemo(
    () => ({
      url: project.websiteUrl || project.githubUrl,
      isWebsite: !!project.websiteUrl,
      isEven: index % 2 === 0,
    }),
    [project.websiteUrl, project.githubUrl, index]
  );

  const { title, workDescription, tags, galleryImages } = useMemo(
    () => ({
      title: project.text.title,
      workDescription: project.text.workDescription,
      tags: project.tags,
      galleryImages: project.images.galleryImages,
    }),
    [
      project.text.title,
      project.text.workDescription,
      project.tags,
      project.images.galleryImages,
    ]
  );

  const displayTags = useMemo(() => tags.slice(0, 3), [tags]);

  // Single set of refs - use CSS to show/hide
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLHeadingElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const viewProjectButtonRef = useRef<HTMLAnchorElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Reusable animation config
  const animationConfig = useMemo(
    () => ({
      opacity: 0,
      yPercent: -100,
      stagger: 0.025,
      ease: "power2.inOut",
      duration: 0.8,
    }),
    []
  );

  useGSAP(() => {
    // Early return if refs not ready
    if (
      !titleRef.current ||
      !descriptionRef.current ||
      !tagsRef.current ||
      !buttonRef.current ||
      !viewProjectButtonRef.current
    ) {
      return;
    }

    // Create all splits at once
    const titleSplits = SplitText.create(titleRef.current, {
      type: "words",
    });

    const descriptionSplits = SplitText.create(descriptionRef.current, {
      type: "lines",
    });

    const tagSplits = SplitText.create(tagsRef.current, {
      type: "chars",
    });

    // Create a timeline for better performance and control
    const tl = gsap.timeline();

    tl.from(
      titleSplits.words,
      {
        ...animationConfig,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom",
          end: "bottom 95%",
          scrub: 1,
        },
      },
      0
    )
      .from(
        descriptionSplits.lines,
        {
          opacity: 0,
          yPercent: -100,
          stagger: 0.025,
          ease: "power2.inOut",
          duration: 0.8,
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top bottom",
            end: "bottom 95%",
            scrub: 1,
          },
        },
        0.1
      )
      .from(
        tagSplits.chars,
        {
          opacity: 0,
          yPercent: -100,
          stagger: 0.025,
          ease: "power2.inOut",
          duration: 0.8,
          scrollTrigger: {
            trigger: tagsRef.current,
            start: "top bottom",
            end: "bottom 95%",
            scrub: 1,
          },
        },
        0.15
      )
      .from(
        buttonRef.current,
        {
          opacity: 0,
          yPercent: -100,
          ease: "power2.inOut",
          duration: 0.8,
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top bottom",
            end: "bottom 95%",
            scrub: 1,
          },
        },
        0.2
      )
      .from(
        viewProjectButtonRef.current,
        {
          opacity: 0,
          yPercent: -100,
          ease: "power2.inOut",
          duration: 0.8,
          scrollTrigger: {
            trigger: viewProjectButtonRef.current,
            start: "top bottom",
            end: "bottom 95%",
            scrub: 1,
          },
        },
        0.25
      );

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      titleSplits.revert();
      descriptionSplits.revert();
      tagSplits.revert();
    };
  }, [animationConfig]);

  const renderTextContent = useCallback(() => {
    return (
      <div className="flex flex-col w-full h-full gap-5 px-5 py-3 sm:p-10">
        <h1
          ref={titleRef}
          className="font-funnel-sans text-white text-[20px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-bold break-words"
        >
          {title}
        </h1>
        <div
          ref={tagsRef}
          className="flex flex-row items-center overflow-x-auto scrollbar-hide min-w-0 flex-shrink-0 gap-2"
        >
          {displayTags.map((tag, i) => (
            <React.Fragment key={tag}>
              <span className="font-funnel-sans text-primary-800 text-[13px] xs:text-[14px] font-medium break-words px-3 py-1.5 bg-white/95 rounded-full border border-white/50 shadow-sm hover:bg-white hover:scale-105 transition-all duration-200 whitespace-nowrap flex-shrink-0">
                {tag}
              </span>
              {i !== displayTags.length - 1 && (
                <span className="font-funnel-sans text-white/60 text-[12px] xs:text-[14px] font-light mx-2 xs:mx-3 flex-shrink-0">
                  •
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
        <h2
          ref={descriptionRef}
          className="font-funnel-sans text-gray-100 text-[12px] xs:text-[16px] font-regular break-words leading-relaxed"
        >
          {workDescription}
        </h2>
        <div className="flex w-full mt-8 flex-row gap-3 md:gap-5">
          <VisitButton url={url} isWebsite={isWebsite} ref={buttonRef} />
          <ViewProjectButton
            href={`/projects/${project.id}`}
            ref={viewProjectButtonRef}
          />
        </div>
      </div>
    );
  }, [title, displayTags, workDescription, url, isWebsite, project.id]);

  return (
    <div
      id={`recent-project-card-${isMobile ? "mobile" : "desktop"}`}
      className={`flex ${
        isMobile ? "flex-col gap-3" : "flex-row gap-3"
      } w-full bg-gradient-to-b from-primary-900 via-black to-accent-950 overflow-x-hidden rounded-xl ${
        isMobile ? "pb-6" : ""
      }`}
    >
      {isMobile ? (
        <>
          <div className="flex flex-col w-full h-[50dvh]">
            <ImageCarousel images={galleryImages} />
          </div>
          <div className="flex flex-col flex-1 w-full h-full overflow-x-hidden">
            {renderTextContent()}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col w-1/2 min-h-0">
            {isEven ? (
              renderTextContent()
            ) : (
              <ImageCarousel images={galleryImages} />
            )}
          </div>
          <div className="flex flex-col flex-1 min-h-0">
            {isEven ? (
              <ImageCarousel images={galleryImages} />
            ) : (
              renderTextContent()
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentProjectCard;
