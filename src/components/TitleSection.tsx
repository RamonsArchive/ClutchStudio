"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import ContactButton from "./ContactButton";
//import useMobile from "@/components/useMobile";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TitleSection = ({
  headerTitle,
  mainTitle,
  subTitle,
  headerClassName,
  mainTitleClassName,
  subTitleClassName,
  includeContactButton = false,
}: {
  headerTitle: React.ReactNode;
  mainTitle: React.ReactNode;
  subTitle: React.ReactNode;
  headerClassName?: string;
  mainTitleClassName?: string;
  subTitleClassName?: string;
  includeContactButton?: boolean;
}) => {
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLHeadingElement>(null);
  //const { isMobile } = useMobile();
  //console.log("isMobile in title section", isMobile);
  useGSAP(() => {
    // Create SplitText instances
    const headerTitleElm = headerTitleRef.current;
    const mainTitleElm = mainTitleRef.current;
    const subTitleElm = subTitleRef.current;
    let contactButtonElm = null;
    if (includeContactButton) {
      contactButtonElm = document.getElementById("contact-button");
    }
    console.log("headerTitleElm", headerTitleElm);
    console.log("mainTitleElm", mainTitleElm);
    console.log("subTitleElm", subTitleElm);

    if (!headerTitleElm || !mainTitleElm || !subTitleElm) {
      console.error("TitleSection: One or more title elements not found");
      return;
    }

    const headerTitleSplits = SplitText.create(headerTitleElm, {
      type: "words",
    });

    const mainTitleSplits = SplitText.create(mainTitleElm, {
      type: "chars",
    });

    console.log(
      "Main title splits created:",
      mainTitleSplits.chars?.length,
      "characters"
    );

    // Apply premium gradient effect using CSS classes (like contact button)
    if (mainTitleSplits.chars) {
      mainTitleSplits.chars.forEach((char, index) => {
        const charElement = char as HTMLElement;

        // Apply premium gradient classes for high-performance animation
        charElement.classList.add("gradient-char");

        // Add custom animation delay for each character
        charElement.style.animationDelay = `${index * 0.1}s`;
      });
    }

    const subTitleSplits = SplitText.create(subTitleElm, {
      type: "words",
    });

    // Set initial state for all characters
    gsap.set(
      [headerTitleSplits.words, mainTitleSplits.chars, subTitleSplits.words],
      {
        opacity: 0,
        yPercent: -100,
      }
    );

    if (contactButtonElm) {
      gsap.set(contactButtonElm, {
        opacity: 0,
        yPercent: -100,
      });
    }

    // Initial animation timeline
    const initialAnimationTL = gsap.timeline({
      onComplete: () => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (!isMobile) {
          console.log("isMobile is false anaimting as such");
          gsap.to(headerTitleSplits.words, {
            scrollTrigger: {
              trigger: "#header-title",
              start: "top top",
              end: "bottom 30%",
              scrub: 0.8,
              markers: true,
            },
            opacity: 0,
            yPercent: -100,
            stagger: 0.01,
          });

          gsap.to(mainTitleSplits.chars, {
            scrollTrigger: {
              trigger: "#main-title",
              start: "top top",
              end: "bottom 20%",
              scrub: 0.8,
              markers: true,
            },
            opacity: 0,
            yPercent: -100,
            stagger: 0.01,
          });
          gsap.to(subTitleSplits.words, {
            scrollTrigger: {
              trigger: "#sub-title",
              start: "top top", // Changed from top+100 to top-100 to start higher
              end: "bottom 20%",
              scrub: 0.8,
              markers: true,
            },
            opacity: 0,
            yPercent: -100,
            stagger: 0.01,
          });
          if (contactButtonElm) {
            gsap.to(contactButtonElm, {
              scrollTrigger: {
                trigger: "#contact-button",
                start: "top top",
                end: "bottom 20%",
                scrub: 0.8,
                markers: true,
              },
              opacity: 0,
              yPercent: -100,
            });
          }
        } else {
          console.log("isMobile is true anaimting as such");
          const scrollAnimationTL = gsap.timeline({
            scrollTrigger: {
              trigger: "#title-container",
              start: "top top",
              end: "bottom 20%",
              scrub: 0.8,
              markers: true,
            },
          });
          scrollAnimationTL.to(headerTitleSplits.words, {
            opacity: 0,
            yPercent: -100,
            stagger: 0.01,
          });
          scrollAnimationTL.to(mainTitleSplits.chars, {
            opacity: 0,
            yPercent: -100,
            stagger: 0.01,
          });
          scrollAnimationTL.to(subTitleSplits.words, {
            opacity: 0,
            yPercent: -100,
            stagger: 0.01,
          });
          if (contactButtonElm) {
            gsap.to(contactButtonElm, {
              scrollTrigger: {
                trigger: "#contact-button",
                start: "top top",
                end: "bottom 20%",
                scrub: 0.8,
                markers: true,
              },
              opacity: 0,
              yPercent: -100,
            });
          }
        }
      },
    });

    // Initial entrance animation
    initialAnimationTL
      .to(headerTitleSplits.words, {
        opacity: 1,
        yPercent: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(0.8)",
      })
      .to(
        mainTitleSplits.chars,
        {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          stagger: 0.04,
          ease: "back.out(0.8)",
        },
        "-=0.4"
      )
      .to(
        subTitleSplits.words,
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "back.out(0.8)",
        },
        "-=0.6"
      );
    if (contactButtonElm) {
      initialAnimationTL.to(contactButtonElm, {
        opacity: 1,
        yPercent: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(0.8)",
      });
    }

    return () => {
      initialAnimationTL.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      mainTitleSplits.revert();
      subTitleSplits.revert();
      headerTitleSplits.revert();
    };
  }, [headerTitle, mainTitle, subTitle]);

  return (
    <div
      id="title-container"
      className="flex gap-10 p-5 h-[25%] w-full bg-primary-background-500 wavy-border-bottom"
    >
      <div className="flex justify-start flex-col md:flex-row gap-5 md:gap-10 cursor-pointer md:p-5">
        <div className="flex flex-col gap-5">
          {headerTitle && (
            <h3
              id="header-title"
              ref={headerTitleRef}
              className={`${headerClassName}`}
            >
              {headerTitle}
            </h3>
          )}
          <h1
            id="main-title"
            ref={mainTitleRef}
            className={`${mainTitleClassName}`}
          >
            {mainTitle}
          </h1>
        </div>
        <div className="flex flex-col md:flex-center gap-8 md:gap-10">
          {subTitle && (
            <h2
              id="sub-title"
              ref={subTitleRef}
              className={`${subTitleClassName}`}
            >
              {subTitle}
            </h2>
          )}
          {includeContactButton && <ContactButton />}
        </div>
      </div>
    </div>
  );
};

export default TitleSection;
