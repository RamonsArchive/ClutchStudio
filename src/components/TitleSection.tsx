"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import ContactButton from "./ContactButton";
import Image from "next/image";

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

  useGSAP(() => {
    // Create SplitText instances
    const headerTitleElm = headerTitleRef.current;
    const mainTitleElm = mainTitleRef.current;
    const subTitleElm = subTitleRef.current;
    let contactButtonElm = null;
    if (includeContactButton) {
      contactButtonElm = document.getElementById("contact-button");
    }

    const isHeaderTitle = headerTitleElm ? true : false;
    const isSubTitle = subTitleElm ? true : false;

    // Batch SplitText creation for better performance
    const headerTitleSplits = isHeaderTitle
      ? SplitText.create(headerTitleElm, {
          type: "words",
        })
      : null;

    const mainTitleSplits = SplitText.create(mainTitleElm, {
      type: "chars",
    });

    const subTitleSplits = isSubTitle
      ? SplitText.create(subTitleElm, {
          type: "words",
        })
      : null;

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

    // Set initial state for all characters - batch operations
    const allElements = [
      ...(headerTitleSplits?.words || []),
      ...(subTitleSplits?.words || []),
      ...mainTitleSplits.chars,
    ];

    gsap.set(allElements, {
      visibility: "hidden",
      yPercent: -100,
    });

    if (contactButtonElm) {
      gsap.set(contactButtonElm, {
        visibility: "hidden",
        yPercent: -100,
      });
    }

    // Initial animation timeline
    const initialAnimationTL = gsap.timeline({
      onComplete: () => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (!isMobile) {
          // Single consolidated ScrollTrigger for all text elements (same as mobile)
          const desktopScrollTL = gsap.timeline({
            scrollTrigger: {
              trigger: "#title-container",
              start: "top top",
              end: "bottom 1%",
              scrub: 1.2,
            },
          });

          // Add all text animations to the same timeline
          if (headerTitleSplits?.words) {
            desktopScrollTL.to(headerTitleSplits.words, {
              opacity: 0,
              yPercent: -100,
              stagger: 0.02,
            });
          }

          gsap.to(mainTitleSplits.chars, {
            scrollTrigger: {
              trigger: "#main-title",
              start: "top top",
              end: "bottom 20%",
              scrub: 1.2,
            },
            opacity: 0,
            yPercent: -100,
            stagger: 0.02,
          });

          if (subTitleSplits?.words) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: "#sub-title",
                  start: "top top",
                  end: "bottom 10%",
                  scrub: 1.2,
                },
              })
              .to(subTitleSplits.words, {
                opacity: 0,
                yPercent: -100,
                stagger: 0.02,
              });
          }

          // Separate trigger for contact button (less frequent updates)
          if (contactButtonElm) {
            gsap.to(contactButtonElm, {
              scrollTrigger: {
                trigger: "#contact-button",
                start: "top top",
                end: "bottom 40%",
                scrub: 1.5,
              },
              opacity: 0,
              yPercent: -100,
            });
          }

          // Consolidated background icons animation
          if (includeBackgroundIcons) {
            const iconsScrollTrigger = {
              trigger: "#title-container",
              start: "top top",
              end: "bottom 20%",
              scrub: 1.2,
            };

            const iconsTL = gsap.timeline({
              scrollTrigger: iconsScrollTrigger,
            });

            iconsTL
              .to("#clutch-fist-light-1, #clutch-fist-light-3", {
                opacity: 0,
                yPercent: -100,
                xPercent: -50,
                stagger: 0.1,
              })
              .to(
                "#clutch-fist-light-2, #clutch-fist-light-4, #clutch-fist-light-5",
                {
                  opacity: 0,
                  yPercent: -100,
                  xPercent: 50,
                  stagger: 0.1,
                }
              );
          }
        } else {
          // Mobile optimization - single timeline for all animations
          const mobileScrollTL = gsap.timeline({
            scrollTrigger: {
              trigger: "#title-container",
              start: "top top",
              end: "bottom 20%",
              scrub: 1.2,
            },
          });

          if (headerTitleSplits?.words) {
            mobileScrollTL.to(headerTitleSplits.words, {
              opacity: 0,
              yPercent: -100,
              stagger: 0.02,
            });
          }

          mobileScrollTL.to(mainTitleSplits.chars, {
            opacity: 0,
            yPercent: -100,
            stagger: 0.02,
          });

          if (subTitleSplits?.words) {
            mobileScrollTL.to(subTitleSplits.words, {
              opacity: 0,
              yPercent: -100,
              stagger: 0.02,
            });
          }

          if (contactButtonElm) {
            gsap.to(contactButtonElm, {
              scrollTrigger: {
                trigger: "#contact-button",
                start: "top top",
                end: "bottom 40%",
                scrub: 1.5,
              },
              opacity: 0,
              yPercent: -100,
            });
          }

          if (includeBackgroundIcons) {
            const mobileIconsTL = gsap.timeline({
              scrollTrigger: {
                trigger: "#title-container",
                start: "top top",
                end: "bottom 20%",
                scrub: 1.2,
              },
            });

            mobileIconsTL
              .to("#clutch-fist-light-1, #clutch-fist-light-3", {
                opacity: 0,
                yPercent: -100,
                xPercent: -50,
                stagger: 0.1,
              })
              .to(
                "#clutch-fist-light-2, #clutch-fist-light-4, #clutch-fist-light-5",
                {
                  opacity: 0,
                  yPercent: -100,
                  xPercent: 50,
                  stagger: 0.1,
                }
              );
          }
        }
      },
    });

    // Initial entrance animation
    initialAnimationTL
      .to(headerTitleSplits?.words || [], {
        visibility: "visible",
        yPercent: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(0.8)",
      })
      .to(
        mainTitleSplits.chars,
        {
          visibility: "visible",
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
          visibility: "visible",
          yPercent: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "back.out(0.8)",
        },
        "-=0.6"
      );
    if (contactButtonElm) {
      initialAnimationTL.to(contactButtonElm, {
        visibility: "visible",
        yPercent: 0,
        duration: 0.8,
        ease: "linear",
      });
    }

    return () => {
      initialAnimationTL.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Properly revert SplitText instances
      if (mainTitleSplits) mainTitleSplits.revert();
      if (subTitleSplits) subTitleSplits.revert();
      if (headerTitleSplits) headerTitleSplits.revert();

      // Clear any remaining GSAP instances
      gsap.killTweensOf(allElements);
      if (contactButtonElm) gsap.killTweensOf(contactButtonElm);
    };
  }, [headerTitle, mainTitle, subTitle]);

  return (
    <div
      id="title-container"
      className="flex p-5 gap-10 w-full h-full bg-gradient-to-b from-primary-background-900 via-black to-primary-900 wavy-border-bottom overflow-hidden"
    >
      {/* Additional wave layers for enhanced animation */}
      <div className="wave-layer-1"></div>
      <div className="wave-layer-2"></div>

      {/* Background Icons */}
      {includeBackgroundIcons && (
        <>
          <div className="absolute inset-0 pointer-events-none">
            {/* Scattered light icons */}
            <Image
              id="clutch-fist-light-1"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={64}
              height={64}
              className="absolute top-10 left-10 w-16 h-16 opacity-10 rotate-12"
            />
            <Image
              id="clutch-fist-light-2"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={48}
              height={48}
              className="absolute top-20 right-20 w-12 h-12 opacity-15 -rotate-6"
            />
            <Image
              id="clutch-fist-light-3"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={80}
              height={80}
              className="absolute bottom-20 left-1/4 w-20 h-20 opacity-10 rotate-45"
            />
            <Image
              id="clutch-fist-light-4"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={56}
              height={56}
              className="absolute top-1/3 right-1/3 w-14 h-14 opacity-12 -rotate-12"
            />
            <Image
              id="clutch-fist-light-5"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={72}
              height={72}
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
                className={`${headerClassName} invisible`}
              >
                {headerTitle}
              </h3>
            )}
            <h1
              id="main-title"
              ref={mainTitleRef}
              className={`${mainTitleClassName} invisible`}
            >
              {mainTitle}
            </h1>
          </div>
          <div className="flex flex-col md:flex-center gap-3 xs:gap-8 md:gap-10">
            {subTitle && (
              <h2
                id="sub-title"
                ref={subTitleRef}
                className={`${subTitleClassName} invisible`}
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
          className="flex-center w-full flex-col md:flex-row gap-5 md:gap-10 cursor-pointer p-10"
        >
          <div ref={mainTitleRef} className="flex flex-col gap-5">
            {mainTitle && (
              <h1 className={`${mainTitleClassName} invisible`}>{mainTitle}</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TitleSection;
