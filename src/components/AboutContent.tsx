"use client";
import React from "react";
import Image from "next/image";
import ContactButton from "@/components/ContactButton";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const AboutContent = ({
  subtitle,
  introduction,
  education,
  technicalSkills,
  images,
}: {
  subtitle: string;
  introduction: string;
  education: string;
  technicalSkills: { [key: string]: string };
  images: string[];
}) => {
  const subtitleRef = useRef(null);
  const introductionTitleRef = useRef(null);
  const introductionRef = useRef(null);
  const educationTitleRef = useRef(null);
  const educationRef = useRef(null);
  const technicalSkillsTitleRef = useRef(null);
  const technicalSkillsRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const contactButtonRef = useRef<HTMLAnchorElement | null>(null);

  useGSAP(() => {
    const subTitleSplit = new SplitText(subtitleRef.current, {
      type: "words",
    });

    const introductionTitleSplit = new SplitText(introductionTitleRef.current, {
      type: "words",
    });

    const introductionSplit = new SplitText(introductionRef.current, {
      type: "words",
    });

    const educationTitleSplit = new SplitText(educationTitleRef.current, {
      type: "words",
    });

    const educationSplit = new SplitText(educationRef.current, {
      type: "words",
    });

    const technicalSkillsTitleSplit = new SplitText(
      technicalSkillsTitleRef.current,
      {
        type: "words",
      }
    );

    const technicalSkillsSplit = new SplitText(technicalSkillsRef.current, {
      type: "words",
    });

    gsap.set(contactButtonRef.current, {
      opacity: 0,
      yPercent: -100,
    });

    gsap.from(subTitleSplit.words, {
      scrollTrigger: {
        trigger: subtitleRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      yPercent: -100,
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
      yPercent: -100,
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
      yPercent: -100,
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
    });

    gsap.from(educationSplit.words, {
      scrollTrigger: {
        trigger: educationRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
    });

    gsap.from(technicalSkillsTitleSplit.words, {
      scrollTrigger: {
        trigger: technicalSkillsTitleRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      yPercent: -100,
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
      yPercent: -100,
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

    // // After initial animation, add scroll trigger for subtle enhancement
    // imageTimeline.call(() => {
    //   imagesRef.current.forEach((image) => {
    //     gsap.to(image, {
    //       scrollTrigger: {
    //         trigger: image,
    //         start: "top bottom",
    //         end: "bottom 95%",
    //         scrub: 0.5,
    //       },
    //       yPercent: -10,
    //       scale: 1.02,
    //       duration: 1,
    //     });
    //   });
    // });

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
    <div className="flex flex-col lg:flex-row gap-5 md:gap-10 w-full p-5 rounded-xl md:p-10">
      <div className="flex justify-start w-full h-fit">
        <div className=" grid grid-cols-2 gap-3 md:gap-5">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="About"
              width={500}
              height={500}
              ref={(el) => {
                if (imagesRef.current) {
                  imagesRef.current[index] = el;
                }
              }}
              className="aspect-square object-cover rounded-xl shadow-xl opacity-0"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-10 w-full bg-gradient-to-b from-primary-900 via-black to-accent-950 rounded-xl p-5 md:p-10 shadow-xl">
        <h1
          ref={subtitleRef}
          className="font-funnel-sans text-white text-[24px] xs:text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-extrabold break-words"
          style={{ wordBreak: "break-word" }}
        >
          {subtitle}
        </h1>
        <div className="flex flex-col gap-3 w-full">
          <h2
            ref={introductionTitleRef}
            className="font-funnel-sans text-white text-[14px] xs:text-[16px] sm:text-[18px]  break-words font-bold"
          >
            Introduction
          </h2>
          <p
            ref={introductionRef}
            className="font-funnel-sans text-white text-[14px] sm:text-[16px] font-regular break-words"
          >
            {introduction}
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <h2
            ref={educationTitleRef}
            className="font-funnel-sans text-white text-[14px] xs:text-[16px] sm:text-[18px] break-words font-bold"
          >
            Education
          </h2>
          <p
            ref={educationRef}
            className="font-funnel-sans text-white text-[14px] sm:text-[16px] font-regular break-words"
          >
            {education}
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <h2
            ref={technicalSkillsTitleRef}
            className="font-funnel-sans text-white text-[14px] xs:text-[16px] sm:text-[18px] break-words font-bold"
          >
            Technical Skills
          </h2>
          <div
            ref={technicalSkillsRef}
            className="font-funnel-sans text-white text-[14px] sm:text-[16px] font-regular break-words"
          >
            <ul className="flex flex-col list-disc list-inside w-full gap-5">
              {Object.entries(technicalSkills).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-2">
                  <li className="font-funnel-sans text-white text-[14px] sm:text-[16px] break-words font-regular">
                    <span className="font-bold underline">{key}:</span> {value}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <ContactButton
            ref={contactButtonRef as React.RefObject<HTMLAnchorElement>}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
