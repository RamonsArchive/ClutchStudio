"use client";
import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageCarousel from "./ImageCarousel";
import { ProjectTemplate } from "@/types/GlobalTypes";
import VisitButton from "./VisitButton";

gsap.registerPlugin(SplitText, ScrollTrigger);

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

  // Separate refs for mobile and desktop to avoid conflicts
  const mobileTitleRef = useRef<HTMLHeadingElement>(null);
  const mobileDescriptionRef = useRef<HTMLHeadingElement>(null);
  const mobileTagsRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLAnchorElement>(null);

  const desktopTitleRef = useRef<HTMLHeadingElement>(null);
  const desktopDescriptionRef = useRef<HTMLHeadingElement>(null);
  const desktopTagsRef = useRef<HTMLDivElement>(null);
  const desktopButtonRef = useRef<HTMLAnchorElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  // Use useEffect to prevent hydration errors
  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useGSAP(() => {
    // Get the appropriate refs based on current mobile state
    const titleRef = isMobile
      ? mobileTitleRef.current
      : desktopTitleRef.current;
    const descriptionRef = isMobile
      ? mobileDescriptionRef.current
      : desktopDescriptionRef.current;
    const tagsRef = isMobile ? mobileTagsRef.current : desktopTagsRef.current;
    const buttonRef = isMobile
      ? mobileButtonRef.current
      : desktopButtonRef.current;

    console.log("Current refs:", {
      titleRef,
      descriptionRef,
      tagsRef,
      buttonRef,
      isMobile,
    });

    if (!titleRef || !descriptionRef || !tagsRef || !buttonRef) {
      console.error("RecentProjectCard: One or more elements not found", {
        title: !!titleRef,
        description: !!descriptionRef,
        tags: !!tagsRef,
        button: !!buttonRef,
        isMobile,
      });
      return;
    }

    const titleSplits = SplitText.create(titleRef, {
      type: "chars",
    });

    const descriptionSplits = SplitText.create(descriptionRef, {
      type: "words",
    });

    const tagSplit = SplitText.create(tagsRef, { type: "chars" });

    const trigger = isMobile
      ? "#recent-project-card-mobile"
      : "#recent-project-card-desktop";

    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: trigger,
    //     start: "top bottom",
    //     end: "bottom 40%",
    //     scrub: 1,
    //     markers: false,
    //     toggleActions: "play none none reverse",
    //   },
    // });

    // Animate title characters
    gsap.from(titleSplits.chars, {
      opacity: 0,
      yPercent: -100,
      stagger: 0.025,
      ease: "power2.inOut",
      duration: 0.8,
      scrollTrigger: {
        trigger: isMobile ? mobileTitleRef.current : desktopTitleRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
        markers: true,
      },
    });

    // Animate description words
    gsap.from(descriptionSplits.words, {
      opacity: 0,
      yPercent: -100,
      stagger: 0.025,
      ease: "power2.inOut",
      duration: 0.8,
      scrollTrigger: {
        trigger: isMobile
          ? mobileDescriptionRef.current
          : desktopDescriptionRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
        markers: true,
      },
    });

    // Animate tags
    gsap.from(tagSplit.chars, {
      opacity: 0,
      yPercent: -100,
      stagger: 0.025,
      ease: "power2.inOut",
      duration: 0.8,
      scrollTrigger: {
        trigger: isMobile ? mobileTagsRef.current : desktopTagsRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
        markers: true,
      },
    });

    // Animate button
    gsap.from(buttonRef, {
      opacity: 0,
      yPercent: -100,
      ease: "power2.inOut",
      duration: 0.8,
      scrollTrigger: {
        trigger: isMobile ? mobileButtonRef.current : desktopButtonRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
        markers: true,
      },
    });

    // Cleanup function
    return () => {
      // Kill ScrollTrigger to prevent memory leaks
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  const renderTextContent = () => {
    return (
      <div className="flex flex-col w-full h-full gap-5 px-5 py-3 sm:p-10">
        <h1
          ref={desktopTitleRef}
          className="font-funnel-sans text-white text-[20px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-bold break-words"
        >
          {title}
        </h1>
        <div ref={desktopTagsRef} className="flex flex-row items-center">
          {tags.slice(0, 3).map((tag, index) => (
            <div key={index} className="tag-item flex items-center">
              <span className="font-funnel-sans text-white text-[12px] xs:text-[14px] font-extralight break-words">
                {tag}
              </span>
              {index !== tags.slice(0, 3).length - 1 && (
                <span className="font-funnel-sans text-white/60 text-[12px] xs:text-[16px] font-extralight mx-3 xs:mx-5 break-words">
                  |
                </span>
              )}
            </div>
          ))}
        </div>
        <h2
          ref={desktopDescriptionRef}
          className="font-funnel-sans text-white text-[12px] xs:text-[16px] font-regular break-words"
        >
          {workDescription}
        </h2>
        <div className="flex w-full mt-8">
          <VisitButton url={url} isWebsite={isWebsite} ref={desktopButtonRef} />
        </div>
      </div>
    );
  };

  return (
    <>
      {isMobile ? (
        <div
          id="recent-project-card-mobile"
          className="flex sm:hidden flex-col gap-3 w-full pb-6 bg-primary-background-900 overflow-x-hidden"
        >
          <div className="flex flex-col w-full h-[50dvh]">
            <ImageCarousel images={galleryImages} />
          </div>
          <div className="flex flex-col flex-1 w-full h-full px-5 py-3 gap-5 overflow-x-hidden">
            <h1
              ref={mobileTitleRef}
              className="font-funnel-sans text-white text-[20px] xs:text-[24px] sm:text-[28px] md:text-[32px]  font-bold break-words"
            >
              {title}
            </h1>
            <div ref={mobileTagsRef} className="flex flex-row items-center">
              {tags.slice(0, 3).map((tag, index) => (
                <div key={index} className="tag-item flex items-center">
                  <span className="font-funnel-sans text-white text-[12px] xs:text-[14px] font-extralight break-words">
                    {tag}
                  </span>
                  {index !== tags.slice(0, 3).length - 1 && (
                    <span className="font-funnel-sans text-white/60 text-[12px] xs:text-[16px] font-extralight mx-3 xs:mx-5 break-words">
                      |
                    </span>
                  )}
                </div>
              ))}
            </div>
            <h2
              ref={mobileDescriptionRef}
              className="font-funnel-sans text-white text-[12px] xs:text-[16px] font-regular break-words"
            >
              {workDescription}
            </h2>
            <div className="flex w-full mt-5">
              <VisitButton
                url={url}
                isWebsite={isWebsite}
                ref={mobileButtonRef}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          id="recent-project-card-desktop"
          className="hidden sm:flex flex-row gap-3 w-full bg-primary-background-900 overflow-x-hidden"
        >
          <div className="flex flex-col w-1/2">
            {isEven ? (
              renderTextContent()
            ) : (
              <ImageCarousel images={galleryImages} />
            )}
          </div>
          <div className="flex flex-col flex-1">
            {isEven ? (
              <ImageCarousel images={galleryImages} />
            ) : (
              renderTextContent()
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentProjectCard;
