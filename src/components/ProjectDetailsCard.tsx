"use client";
import React from "react";
import { ProjectTemplate } from "@/types/GlobalTypes";
import VisitButton from "./VisitButton";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const ProjectDetailsCard = ({ data }: { data: ProjectTemplate }) => {
  const { name } = data.text;
  const isClient = data.isClient;
  const tags = data.tags;
  const url = data.websiteUrl ? data.websiteUrl : data.githubUrl;
  const isWebsite = data.isWebsite;
  const visitButtonRef = useRef<HTMLAnchorElement>(null);
  const clientRef = useRef<HTMLDivElement>(null);
  const clientNameRef = useRef<HTMLHeadingElement>(null);

  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesTagsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const clientSplit = SplitText.create(clientRef.current, {
      type: "words",
    });

    const clientNameSplit = SplitText.create(clientNameRef.current, {
      type: "words",
    });

    const servicesSplit = SplitText.create(servicesRef.current, {
      type: "words",
    });

    const servicesTagsSplit = SplitText.create(servicesTagsRef.current, {
      type: "words",
    });

    gsap.from(clientSplit.words, {
      scrollTrigger: {
        trigger: clientRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      opacity: 0,
      yPercent: -100,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.from(servicesSplit.words, {
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      opacity: 0,
      yPercent: -100,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.from(servicesTagsSplit.words, {
      scrollTrigger: {
        trigger: servicesTagsRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      opacity: 0,
      yPercent: -100,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.from(clientNameSplit.words, {
      scrollTrigger: {
        trigger: clientNameRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      opacity: 0,
      yPercent: -100,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.from(visitButtonRef.current, {
      scrollTrigger: {
        trigger: visitButtonRef.current,
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      },
      opacity: 0,
      yPercent: -100,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [visitButtonRef, clientRef, servicesRef, servicesTagsRef, clientNameRef]);

  return (
    <div className="flex flex-col gap-6 bg-primary-100 rounded-xl p-6 shadow-lg w-full">
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-300/40">
        <div className="flex flex-col gap-2">
          <h3
            ref={clientRef}
            className="font-funnel-sans text-gray-600 text-[14px] font-medium uppercase tracking-wide"
          >
            {isClient ? "Client" : "Project"}
          </h3>
          <h1
            ref={clientNameRef}
            className="font-funnel-sans text-black text-[28px] sm:text-[32px] font-bold leading-tight"
          >
            {name}
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-4 pb-6 border-b border-gray-300/40">
        <h3
          ref={servicesRef}
          className="font-funnel-sans text-gray-600 text-[14px] font-medium uppercase tracking-wide"
        >
          Services Provided
        </h3>

        <div
          ref={servicesTagsRef}
          className="flex flex-col lg:flex-row gap-3 flex-wrap"
        >
          {tags.slice(0, 5).map((tag, index) => {
            const visibleTags = tags.slice(0, 5);
            return (
              <div key={index} className="tag-item flex items-center">
                <span className="font-funnel-sans text-black/80 text-[13px] xs:text-[14px] font-medium break-words px-3 py-1 bg-white/80 rounded-full border border-gray-200/50">
                  {tag}
                </span>
                {index !== visibleTags.length - 1 && (
                  <span className="font-funnel-sans text-black/40 text-[12px] xs:text-[14px] font-light mx-2 xs:mx-3 break-words">
                    |
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex w-full flex-col">
        <VisitButton url={url} isWebsite={isWebsite} ref={visitButtonRef} />
      </div>
    </div>
  );
};

export default ProjectDetailsCard;
