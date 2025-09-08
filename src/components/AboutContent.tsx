"use client";
import React from "react";
import ContactButton from "@/components/ContactButton";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useCallback, useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

const AboutContent = ({
  subtitle,
  introduction,
  education,
  releventCoursework,
  favoriteTools,
  technicalSkills,
  images,
}: {
  subtitle: string;
  introduction: string;
  education: string;
  releventCoursework: string[];
  favoriteTools: { title: string; svg: string }[];
  technicalSkills: { [key: string]: string[] };
  images: string[];
}) => {
  const subtitleRef = useRef(null);
  const introductionTitleRef = useRef(null);
  const introductionRef = useRef(null);
  const educationTitleRef = useRef(null);
  const educationRef = useRef(null);
  const favoriteToolsTitleRef = useRef(null);
  const favoriteToolsRef = useRef<(HTMLDivElement | null)[]>([]);
  const releventCourseworkTitleRef = useRef(null);
  const releventCourseworkRef = useRef<(HTMLDivElement | null)[]>([]);
  const setFavoriteToolRef = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      if (el) {
        favoriteToolsRef.current[index] = el;
      }
    },
    []
  );

  const setRelevantCourseworkRef = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      if (el) {
        releventCourseworkRef.current[index] = el as HTMLDivElement;
      }
    },
    []
  );

  const technicalSkillsTitleRef = useRef(null);
  const technicalSkillsRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const contactButtonRef = useRef<HTMLAnchorElement | null>(null);

  useGSAP(() => {
    const subTitleSplit = SplitText.create(subtitleRef.current, {
      type: "words",
    });

    const introductionTitleSplit = SplitText.create(
      introductionTitleRef.current,
      {
        type: "words",
      }
    );

    const introductionSplit = SplitText.create(introductionRef.current, {
      type: "words",
    });

    const educationTitleSplit = SplitText.create(educationTitleRef.current, {
      type: "words",
    });

    const educationSplit = SplitText.create(educationRef.current, {
      type: "words",
    });

    const technicalSkillsTitleSplit = SplitText.create(
      technicalSkillsTitleRef.current,
      {
        type: "words",
      }
    );

    const releventCourseworkTitleSplit = SplitText.create(
      releventCourseworkTitleRef.current,
      {
        type: "words",
      }
    );

    const favoriteToolsTitleSplit = SplitText.create(
      favoriteToolsTitleRef.current,
      {
        type: "words",
      }
    );

    const technicalSkillsSplit = SplitText.create(technicalSkillsRef.current, {
      type: "words",
    });

    gsap.from(releventCourseworkTitleSplit.words, {
      scrollTrigger: {
        trigger: releventCourseworkTitleRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });

    releventCourseworkRef.current.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 99%",
          end: "bottom 80%",
          scrub: 1,
        },
        yPercent: 40,
        opacity: 0,
        duration: 1,
      });
    });

    gsap.from(favoriteToolsTitleSplit.words, {
      scrollTrigger: {
        trigger: favoriteToolsTitleRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });

    const favToolTL = gsap.timeline({
      scrollTrigger: {
        trigger: favoriteToolsRef.current,
        start: "top 99%",
        end: "bottom 80%",
        scrub: 1,
      },
      stagger: 0.2,
    });
    favoriteToolsRef.current.forEach((el) => {
      favToolTL.from(el, {
        yPercent: 40,
        opacity: 0,
        duration: 1,
      });
    });

    gsap.set(contactButtonRef.current, {
      visibility: "visible",
      opacity: 0,
      yPercent: 100,
    });

    gsap.from(subTitleSplit.words, {
      scrollTrigger: {
        trigger: subtitleRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });

    gsap.from(introductionTitleSplit.words, {
      scrollTrigger: {
        trigger: introductionTitleRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });

    gsap.from(introductionSplit.words, {
      scrollTrigger: {
        trigger: introductionRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });

    gsap.from(educationTitleSplit.words, {
      scrollTrigger: {
        trigger: educationTitleRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });

    gsap.from(educationSplit.words, {
      scrollTrigger: {
        trigger: educationRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });

    gsap.from(technicalSkillsTitleSplit.words, {
      scrollTrigger: {
        trigger: technicalSkillsTitleRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });

    gsap.from(technicalSkillsSplit.words, {
      scrollTrigger: {
        trigger: technicalSkillsRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });

    gsap.to(contactButtonRef.current, {
      scrollTrigger: {
        trigger: contactButtonRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 0.01,
      },
      yPercent: 0,
      opacity: 1,
      duration: 1,
    });

    // Initial entrance animation for images (snappy and clean)
    imagesRef.current.forEach((image, index) => {
      gsap.set(image, {
        opacity: 0,
        yPercent: 100,
      });
    });

    const imageTimeline = gsap.timeline();

    imageTimeline.to(imagesRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });

    return () => {
      if (subtitleRef.current) {
        subTitleSplit.revert();
      }
      if (introductionTitleRef.current) {
        introductionTitleSplit.revert();
      }
      if (introductionRef.current) {
        introductionSplit.revert();
      }
      if (educationTitleRef.current) {
        educationTitleSplit.revert();
      }
      if (educationRef.current) {
        educationSplit.revert();
      }
      if (technicalSkillsTitleRef.current) {
        technicalSkillsTitleSplit.revert();
      }
      if (technicalSkillsRef.current) {
        technicalSkillsSplit.revert();
      }
      if (favoriteToolsTitleRef.current) {
        favoriteToolsTitleSplit.revert();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    subtitleRef,
    introductionTitleRef,
    introductionRef,
    educationRef,
    technicalSkillsRef,
    imagesRef,
    contactButtonRef,
  ]);

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full p-3 rounded-xl md:p-5">
      <div className="flex justify-start w-full lg:w-[40%] h-full">
        <div className=" grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-5 w-full">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="About"
              ref={(el) => {
                if (imagesRef.current) {
                  imagesRef.current[index] = el;
                }
              }}
              className="aspect-square object-cover rounded-xl shadow-xl opacity-0 w-full"
              sizes="(max-width: 768px) 35vw, 25vw"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-[60%] h-fit gap-10 bg-gradient-to-b from-primary-900 via-black to-accent-950 rounded-xl p-5 md:p-10 shadow-xl">
        <h1
          ref={subtitleRef}
          className="font-funnel-sans text-white text-[24px] xs:text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-extrabold break-words"
          style={{ wordBreak: "break-word" }}
        >
          {subtitle}
        </h1>
        <div className="flex flex-col gap-4 w-full p-4 md:p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
          <h2
            ref={introductionTitleRef}
            className="font-funnel-sans text-white text-[18px] sm:text-[20px] break-words font-bold border-b border-white/30 pb-2"
          >
            Introduction
          </h2>
          <p
            ref={introductionRef}
            className="font-funnel-sans text-gray-100 text-[14px] sm:text-[16px] font-regular break-words leading-relaxed"
          >
            {introduction}
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full p-4 md:p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
          <h2
            ref={educationTitleRef}
            className="font-funnel-sans text-white text-[18px] sm:text-[20px] break-words font-bold border-b border-white/30 pb-2"
          >
            Education
          </h2>
          <p
            ref={educationRef}
            className="font-funnel-sans text-gray-100 text-[14px] sm:text-[16px] font-regular break-words leading-relaxed"
          >
            {education}
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl p-4 md:p-6 border border-primary-200/30 shadow-sm">
          <h2
            ref={releventCourseworkTitleRef}
            className="font-funnel-sans text-primary-900 text-[18px] sm:text-[20px] break-words font-bold border-b border-primary-200 pb-2"
          >
            Relevant Coursework
          </h2>
          <div className="flex flex-col gap-3 w-full">
            {releventCoursework.map((course, index) => (
              <div
                key={index}
                ref={(el) => setRelevantCourseworkRef(el, index)}
                className="flex items-center gap-3 p-3 bg-white/70 rounded-lg border border-primary-100/50 hover:bg-white/90 transition-colors duration-200"
              >
                <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                <p className="font-funnel-sans text-primary-800 text-[14px] sm:text-[16px] font-medium break-words">
                  {course}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full bg-gradient-to-br from-secondary-50 to-secondary-100/50 rounded-xl p-4 md:p-6 border border-secondary-200/30 shadow-sm">
          <h2
            ref={favoriteToolsTitleRef}
            className="font-funnel-sans text-secondary-900 text-[18px] sm:text-[20px] break-words font-bold border-b border-secondary-200 pb-2"
          >
            Favorite Tools
          </h2>
          <div className="font-funnel-sans text-secondary-800 text-[14px] sm:text-[16px] grid grid-cols-3 gap-4 break-words w-full items-center justify-center justify-items-center">
            {favoriteTools.map(({ title, svg }, index) => (
              <div
                key={index}
                className="relative group"
                ref={(el) => setFavoriteToolRef(el, index)}
              >
                <img
                  src={svg}
                  alt={title}
                  width={125}
                  height={125}
                  className="bg-white/80 border-2 border-secondary-200/50 p-3 rounded-full whitespace-nowrap flex flex-col items-center justify-center hover:scale-110 hover:border-secondary-300 transition-all duration-300 ease-in-out active:scale-95 shadow-sm hover:shadow-md"
                />
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-secondary-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                  {title}
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-secondary-800"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full p-4 md:p-6 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl border border-primary-200/30 shadow-sm">
          <h2
            ref={technicalSkillsTitleRef}
            className="font-funnel-sans text-primary-900 text-[18px] sm:text-[20px] break-words font-bold border-b border-primary-200 pb-2"
          >
            Technical Skills
          </h2>
          <div
            ref={technicalSkillsRef}
            className="font-funnel-sans text-gray-800 text-[14px] sm:text-[16px] font-regular break-words"
          >
            <div className="flex flex-col gap-6 w-full">
              {Object.entries(technicalSkills).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col gap-3 p-3 bg-white/60 rounded-lg border border-primary-100/50 hover:bg-white/80 transition-colors duration-200"
                >
                  <h3 className="font-funnel-sans text-primary-800 text-[16px] sm:text-[18px] font-semibold capitalize">
                    {key.replace(/_/g, " ")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {value.map((v, index) => (
                      <span
                        key={index}
                        className="font-medium bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 px-3 py-1.5 rounded-full text-sm border border-primary-200/50 hover:from-primary-200 hover:to-primary-300 hover:scale-105 transition-all duration-200 cursor-default"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full justify-center items-center">
          <ContactButton
            ref={contactButtonRef as React.RefObject<HTMLAnchorElement>}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
