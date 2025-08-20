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
  includeBackgroundIcons = false,
}: {
  headerTitle?: React.ReactNode;
  mainTitle: React.ReactNode;
  subTitle?: React.ReactNode;
  headerClassName?: string;
  mainTitleClassName?: string;
  subTitleClassName?: string;
  includeContactButton?: boolean;
  includeBackgroundIcons?: boolean;
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

    const isHeaderTitle = headerTitleElm ? true : false;
    const isSubTitle = subTitleElm ? true : false;

    // if (!headerTitleElm || !mainTitleElm || !subTitleElm) {
    //   console.log("TitleSection: One or more title elements not found");
    //   return;
    // }

    const headerTitleSplits = isHeaderTitle
      ? SplitText.create(headerTitleElm, {
          type: "words",
        })
      : null;

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

    const subTitleSplits = isSubTitle
      ? SplitText.create(subTitleElm, {
          type: "words",
        })
      : null;

    // Set initial state for all characters

    if (headerTitleSplits?.words) {
      gsap.set(headerTitleSplits.words, {
        opacity: 0,
        yPercent: -100,
      });
    }

    if (subTitleSplits?.words) {
      gsap.set(subTitleSplits.words, {
        opacity: 0,
        yPercent: -100,
      });
    }

    gsap.set(mainTitleSplits.chars, {
      opacity: 0,
      yPercent: -100,
    });

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
          if (headerTitleSplits?.words) {
            gsap.to(headerTitleSplits.words, {
              scrollTrigger: {
                trigger: "#header-title",
                start: "top top",
                end: "bottom 30%",
                scrub: 0.8,
              },
              opacity: 0,
              yPercent: -100,
              stagger: 0.01,
            });
          }

          gsap.to(mainTitleSplits.chars, {
            scrollTrigger: {
              trigger: "#main-title",
              start: "top top",
              end: "bottom 20%",
              scrub: 0.8,
            },
            opacity: 0,
            yPercent: -100,
            stagger: 0.01,
          });

          if (subTitleSplits?.words) {
            gsap.to(subTitleSplits.words, {
              scrollTrigger: {
                trigger: "#sub-title",
                start: "top top", // Changed from top+100 to top-100 to start higher
                end: "bottom 20%",
                scrub: 0.8,
              },
              opacity: 0,
              yPercent: -100,
              stagger: 0.01,
            });
          }
          if (contactButtonElm) {
            gsap.to(contactButtonElm, {
              scrollTrigger: {
                trigger: "#contact-button",
                start: "top top",
                end: "bottom 40%",
                scrub: 0.01,
              },
              opacity: 0,
              yPercent: -100,
            });
          }
          if (includeBackgroundIcons) {
            gsap.to("#clutch-fist-light-1", {
              scrollTrigger: {
                trigger: "#clutch-fist-light-1",
                start: "top top",
                end: "bottom 20%",
                scrub: 0.8,
              },
              opacity: 0,
              yPercent: -100,
              stagger: 0.01,
              xPercent: -50,
            });
            gsap.to("#clutch-fist-light-2", {
              scrollTrigger: {
                trigger: "#clutch-fist-light-2",
                start: "top top",
                end: "bottom 20%",
                scrub: 0.8,
              },
              opacity: 0,
              yPercent: -100,
              xPercent: 50,
              stagger: 0.01,
            });
            gsap.to("#clutch-fist-light-3", {
              scrollTrigger: {
                trigger: "#clutch-fist-light-3",
                start: "top top",
                end: "bottom 20%",
                scrub: 0.8,
              },
              opacity: 0,
              yPercent: -100,
              xPercent: -50,
              stagger: 0.01,
            });
            gsap.to("#clutch-fist-light-4", {
              scrollTrigger: {
                trigger: "#clutch-fist-light-4",
                start: "top top",
                end: "bottom 20%",
                scrub: 0.8,
              },
              opacity: 0,
              yPercent: -100,
              xPercent: 50,
              stagger: 0.01,
            });
            gsap.to("#clutch-fist-light-5", {
              scrollTrigger: {
                trigger: "#clutch-fist-light-5",
                start: "top top",
                end: "bottom 20%",
                scrub: 0.8,
              },
              opacity: 0,
              yPercent: -100,
              xPercent: 50,
              stagger: 0.01,
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
            },
          });

          if (headerTitleSplits?.words) {
            scrollAnimationTL.to(headerTitleSplits.words, {
              opacity: 0,
              yPercent: -100,
              stagger: 0.01,
            });
          }

          scrollAnimationTL.to(mainTitleSplits.chars, {
            opacity: 0,
            yPercent: -100,
            stagger: 0.01,
          });

          if (subTitleSplits?.words) {
            scrollAnimationTL.to(subTitleSplits.words, {
              opacity: 0,
              yPercent: -100,
              stagger: 0.01,
            });
          }
          if (contactButtonElm) {
            gsap.to(contactButtonElm, {
              scrollTrigger: {
                trigger: "#contact-button",
                start: "top top",
                end: "bottom 40%",
                scrub: 0.01,
              },
              opacity: 0,
              yPercent: -100,
            });
          }
          if (includeBackgroundIcons) {
            gsap.to("#clutch-fist-light-1", {
              scrollTrigger: {
                trigger: "#clutch-fist-light-1",
                start: "top top",
                end: "bottom 20%",
                scrub: 0.8,
              },
              opacity: 0,
              yPercent: -100,
              xPercent: -50,
              stagger: 0.01,
            });
            gsap.to("#clutch-fist-light-2", {
              scrollTrigger: {
                trigger: "#clutch-fist-light-2",
                start: "top top",
                end: "bottom 20%",
                scrub: 0.8,
              },
              opacity: 0,
              yPercent: -100,
              xPercent: 50,
              stagger: 0.01,
            });
            gsap.to("#clutch-fist-light-3", {
              scrollTrigger: {
                trigger: "#clutch-fist-light-3",
                start: "top top",
                end: "bottom 20%",
                scrub: 0.8,
              },
              opacity: 0,
              yPercent: -100,
              xPercent: -50,
              stagger: 0.01,
            });
            gsap.to("#clutch-fist-light-4", {
              scrollTrigger: {
                trigger: "#clutch-fist-light-4",
                start: "top top",
                end: "bottom 20%",
                scrub: 0.8,
              },
              opacity: 0,
              yPercent: -100,
              xPercent: 50,
              stagger: 0.01,
            });
            gsap.to("#clutch-fist-light-5", {
              scrollTrigger: {
                trigger: "#clutch-fist-light-5",
                start: "top top",
                end: "bottom 20%",
                scrub: 0.8,
              },
              opacity: 0,
              yPercent: -100,
              xPercent: 50,
              stagger: 0.01,
            });
          }
        }
      },
    });

    // Initial entrance animation
    initialAnimationTL
      .to(headerTitleSplits?.words || [], {
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
        subTitleSplits?.words || [],
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
        ease: "linear",
      });
    }

    return () => {
      initialAnimationTL.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      mainTitleSplits.revert();
      if (subTitleSplits) subTitleSplits.revert();
      if (headerTitleSplits) headerTitleSplits.revert();
    };
  }, [headerTitle, mainTitle, subTitle]);

  return (
    <div
      id="title-container"
      className="relative flex gap-10 p-5 h-[50%] w-full bg-gradient-to-b from-primary-background-500 via-blue-900 to-gray-800 wavy-border-bottom overflow-hidden"
    >
      {/* Background Icons */}
      {includeBackgroundIcons && (
        <>
          <div className="absolute inset-0 pointer-events-none">
            {/* Scattered light icons */}
            <img
              id="clutch-fist-light-1"
              src="/Logos/clutchFistLight.svg"
              alt=""
              className="absolute top-10 left-10 w-16 h-16 opacity-10 rotate-12"
            />
            <img
              id="clutch-fist-light-2"
              src="/Logos/clutchFistLight.svg"
              alt=""
              className="absolute top-20 right-20 w-12 h-12 opacity-15 -rotate-6"
            />
            <img
              id="clutch-fist-light-3"
              src="/Logos/clutchFistLight.svg"
              alt=""
              className="absolute bottom-20 left-1/4 w-20 h-20 opacity-8 rotate-45"
            />
            <img
              id="clutch-fist-light-4"
              src="/Logos/clutchFistLight.svg"
              alt=""
              className="absolute top-1/3 right-1/3 w-14 h-14 opacity-12 -rotate-12"
            />
            <img
              id="clutch-fist-light-5"
              src="/Logos/clutchFistLight.svg"
              alt=""
              className="absolute bottom-10 right-10 w-18 h-18 opacity-6 rotate-30"
            />
          </div>
        </>
      )}

      {headerTitle ? (
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
          <div className="flex flex-col md:flex-center gap-3 xs:gap-8 md:gap-10">
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
      ) : (
        <div
          id="title-container"
          className="flex-center w-full flex-col md:flex-row gap-5 md:gap-10 cursor-pointer md:p-5"
        >
          <div ref={mainTitleRef} className="flex flex-col gap-5">
            {mainTitle && (
              <h1 className={`${mainTitleClassName}`}>{mainTitle}</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TitleSection;
