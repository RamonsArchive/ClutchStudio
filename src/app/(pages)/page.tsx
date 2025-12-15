"use client";
import React, { Suspense, useRef } from "react";
import RecentProjectCard from "@/components/RecentProjectCard";
import { RecentProjects } from "@/constants";
import RecentProjectCardSkeleton from "@/components/RecentProjectCardSkeleton";
import Image from "next/image";
import Link from "next/link";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { ArrowDownIcon } from "lucide-react";
import InfiniteScrollSocials from "@/components/InfiniteScrollSocials";
import InfiniteScrollText from "@/components/InfiniteScrollText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textDataRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const desktopIconsRef = useRef<HTMLDivElement>(null);
  const mobileIconsRef = useRef<HTMLDivElement>(null);

  // Mobile refs (separate from desktop)
  const titleRefMobile = useRef<HTMLHeadingElement>(null);
  const textDataRefMobile = useRef<HTMLDivElement>(null);
  const photoRefMobile = useRef<HTMLDivElement>(null);
  const buttonsRefMobile = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (
      !titleRef.current ||
      !photoRef.current ||
      !textDataRef.current ||
      !scrollIndicatorRef.current
    )
      return;

    // Set parent to hidden initially to prevent flash
    gsap.set(titleRef.current, {
      visibility: "hidden",
      opacity: 0,
      overflow: "hidden",
    });

    // Split text for title animation
    const titleSplit = SplitText.create(titleRef.current, {
      type: "words",
    });

    // Set initial state for title words (hidden, above, invisible)
    // Words need inline-block for transforms to work properly
    gsap.set(titleSplit.words, {
      visibility: "hidden",
      opacity: 0,
      yPercent: -100,
    });

    // Make parent visible right before animating words
    gsap.set(titleRef.current, {
      visibility: "visible",
      opacity: 1,
    });

    // Set initial state for photo (hidden, below, invisible)
    gsap.set(photoRef.current, {
      visibility: "hidden",
      opacity: 0,
      yPercent: 100,
    });

    // Set initial state for text (hidden, right, invisible)
    gsap.set(textDataRef.current, {
      visibility: "hidden",
      opacity: 0,
      xPercent: 100,
    });

    gsap.set(scrollIndicatorRef.current, {
      opacity: 0,
      y: -10,
    });

    // Animate title words (slide down and fade in)
    gsap.to(titleSplit.words, {
      visibility: "visible",
      opacity: 1,
      yPercent: 0,
      duration: 1,
      ease: "power2.inOut",
      stagger: 0.02,
    });

    // Animate photo
    gsap.to(photoRef.current, {
      visibility: "visible",
      opacity: 1,
      yPercent: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    // Animate text content
    gsap.to(textDataRef.current, {
      visibility: "visible",
      opacity: 1,
      xPercent: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.to(scrollIndicatorRef.current, {
      visibility: "visible",
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 1.2,
    });

    // Continuous bounce animation
    gsap.to(scrollIndicatorRef.current, {
      y: 8,
      duration: 1.5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      delay: 2,
    });

    // Clutch fist icons animation with ScrollTrigger
    const animateIcons = (container: HTMLDivElement | null, prefix: string) => {
      if (!container) return;

      const leftIcons =
        prefix === "home-desktop"
          ? `#${prefix}-fist-1, #${prefix}-fist-3, #${prefix}-fist-6`
          : `#${prefix}-fist-1, #${prefix}-fist-3`;
      const rightIcons = `#${prefix}-fist-2, #${prefix}-fist-4, #${prefix}-fist-5`;

      const iconsScrollTrigger = {
        trigger: container,
        start: "top top",
        end: "bottom 10%",
        scrub: 1.5,
      };

      // Left icons timeline
      const leftIconsTL = gsap.timeline({
        scrollTrigger: iconsScrollTrigger,
      });

      leftIconsTL.to(leftIcons, {
        opacity: 0,
        yPercent: -100,
        xPercent: -50,
        stagger: 0.3,
        duration: 1.5,
      });

      // Right icons timeline
      const rightIconsTL = gsap.timeline({
        scrollTrigger: iconsScrollTrigger,
      });

      rightIconsTL.to(rightIcons, {
        opacity: 0,
        yPercent: -100,
        xPercent: 50,
        stagger: 0.3,
        duration: 1.5,
      });
    };

    // Animate desktop and mobile icons separately
    animateIcons(desktopIconsRef.current, "home-desktop");
    animateIcons(mobileIconsRef.current, "home-mobile");

    return () => {
      titleSplit.revert();
      gsap.killTweensOf(titleRef.current);
      gsap.killTweensOf(photoRef.current);
      gsap.killTweensOf(textDataRef.current);
      gsap.killTweensOf(scrollIndicatorRef.current);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  });

  // Mobile: Use CSS animations (GPU-accelerated, no JS overhead)
  // Desktop: Keep GSAP for complex animations
  // No useGSAP needed for mobile - pure CSS handles it

  const desktopHomeContent = (
    <div className="hidden sm:flex flex-col h-full w-full max-w-2xl mx-auto my-auto gap-2">
      <h1
        ref={titleRef}
        className="font-funnel-sans text-white text-[58px] xs:text-[60px] md:text-[68px] font-bold wrap-break-word whitespace-nowrap overflow-hidden"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        Hi, I'm Ramon
      </h1>
      <div className="flex flex-row w-full gap-4 md:gap-6">
        {/* Image - exactly 50% width on desktop */}
        <div
          ref={photoRef}
          className="relative w-1/2 shrink-0 flex"
          style={{ visibility: "hidden", opacity: 0 }}
        >
          <Image
            src="/Assets/About/personal1.png"
            alt="Ramon"
            width={500}
            height={500}
            priority
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        {/* Right side - exactly 50% width with content */}
        <div
          ref={textDataRef}
          className="flex flex-col w-1/2 shrink-0 justify-center gap-3 md:gap-4"
          style={{ visibility: "hidden", opacity: 0 }}
        >
          <h2 className="font-funnel-sans text-white text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-extrabold">
            I&apos;m glad you&apos;re here! Look around to see my Full Stack and
            Machine Learning projects 😊.
          </h2>
          <p className="font-funnel-sans text-white/60 text-[12px] sm:text-[14px] md:text-[16px] font-light">
            Based in San Diego, California
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/projects"
              className="w-full sm:w-auto px-6 py-2.5 bg-white text-black font-funnel-sans text-[14px] md:text-[16px] font-semibold rounded-lg hover:bg-white/90 active:bg-white/80 transition-all duration-300 ease-in-out text-center cursor-pointer"
            >
              Projects
            </Link>
            <a
              href="/Assets/Documents/ramon_resume.pdf"
              download
              className="w-full sm:w-auto px-6 py-2.5 bg-transparent border-2 border-white text-white font-funnel-sans text-[14px] md:text-[16px] font-semibold rounded-lg hover:bg-white/10 active:bg-white/20 transition-all duration-300 ease-in-out text-center cursor-pointer"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const mobileHomeContent = (
    <div className="flex max-h-[50dvh] h-full sm:hidden flex-col w-full max-w-sm mx-auto gap-3">
      <div
        ref={textDataRefMobile}
        className="flex flex-col w-full gap-2 mobile-animate-text"
      >
        <div className="flex flex-col w-full">
          <p className="font-funnel-sans text-white/60 text-[12px] sm:text-[14px] md:text-[16px] font-light">
            Based in San Diego, California
          </p>
          <h1
            ref={titleRefMobile}
            className="font-funnel-sans text-white text-[42px] xs:text-[48px] font-bold wrap-break-word overflow-hidden"
          >
            Hi, I'm Ramon
          </h1>
        </div>
        <h2 className="font-funnel-sans text-white text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-extrabold">
          I&apos;m glad you&apos;re here! Look around to see my Full Stack and
          Machine Learning projects 😊.
        </h2>
      </div>
      <div
        ref={photoRefMobile}
        className="relative w-full flex mobile-animate-photo"
      >
        <Image
          src="/Assets/About/personal1.png"
          alt="Ramon"
          width={500}
          height={500}
          priority
          className="w-full h-full object-cover rounded-xl aspect-square"
        />
      </div>
      <div
        ref={buttonsRefMobile}
        className="flex flex-col sm:flex-row gap-3 mt-2 mb-20 mobile-animate-buttons"
      >
        <Link
          href="/projects"
          className="w-full sm:w-auto px-6 py-2.5 bg-white text-black font-funnel-sans text-[14px] md:text-[16px] font-semibold rounded-lg hover:bg-white/90 active:bg-white/80 transition-all duration-300 ease-in-out text-center cursor-pointer"
        >
          Projects
        </Link>
        <a
          href="/Assets/Documents/ramon_resume.pdf"
          download
          className="w-full sm:w-auto px-6 py-2.5 bg-transparent border-2 border-white text-white font-funnel-sans text-[14px] md:text-[16px] font-semibold rounded-lg hover:bg-white/10 active:bg-white/20 transition-all duration-300 ease-in-out text-center cursor-pointer"
        >
          Resume
        </a>
      </div>
    </div>
  );
  return (
    <section className="flex flex-col w-dvw overflow-y-auto scrollbar-hide gap-10 pb-15">
      <div className="flex flex-col h-[calc(100vh-43px)] w-full bg-linear-to-b from-primary-background-950 via-black to-primary-950 wavy-border-bottom overflow-hidden md:overflow-hidden overflow-y-auto">
        <div className="relative w-full h-full py-10 px-5 md:py-16 md:px-10 lg:py-16 lg:px-20">
          {/* Desktop clutch fist icons */}
          <div
            ref={desktopIconsRef}
            className="hidden md:block absolute inset-0 pointer-events-none"
          >
            <img
              id="home-desktop-fist-1"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={64}
              height={64}
              className="absolute top-4 left-4 md:top-10 md:left-10 w-12 h-12 md:w-16 md:h-16 opacity-10 rotate-12"
            />
            <img
              id="home-desktop-fist-2"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={48}
              height={48}
              className="absolute top-8 right-4 md:top-20 md:right-20 w-10 h-10 md:w-12 md:h-12 opacity-15 -rotate-6"
            />
            <img
              id="home-desktop-fist-3"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={80}
              height={80}
              className="absolute bottom-4 left-1/3 md:bottom-20 md:left-1/4 w-16 h-16 md:w-20 md:h-20 opacity-10 rotate-45"
            />
            <img
              id="home-desktop-fist-4"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={56}
              height={56}
              className="absolute top-1/2 right-20 md:top-1/3 md:right-1/3 w-12 h-12 md:w-14 md:h-14 opacity-12 -rotate-12"
            />
            <img
              id="home-desktop-fist-5"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={72}
              height={72}
              className="absolute bottom-8 right-4 md:bottom-10 md:right-10 w-14 h-14 md:w-18 md:h-18 opacity-6 rotate-30"
            />
            <img
              id="home-desktop-fist-6"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={60}
              height={60}
              className="absolute bottom-1/4 left-4 md:bottom-1/3 md:left-8 w-12 h-12 md:w-14 md:h-14 opacity-10 rotate-20"
            />
          </div>
          {/* Mobile clutch fist icons */}
          <div
            ref={mobileIconsRef}
            className="block md:hidden absolute inset-0 pointer-events-none"
          >
            <img
              id="home-mobile-fist-1"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={64}
              height={64}
              className="absolute top-4 left-4 w-12 h-12 opacity-10 rotate-12"
            />
            <img
              id="home-mobile-fist-2"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={48}
              height={48}
              className="absolute top-8 right-4 w-10 h-10 opacity-15 -rotate-6"
            />
            <img
              id="home-mobile-fist-3"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={80}
              height={80}
              className="absolute bottom-4 left-1/3 w-16 h-16 opacity-10 rotate-45"
            />
            <img
              id="home-mobile-fist-4"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={56}
              height={56}
              className="absolute top-1/2 right-20 w-12 h-12 opacity-12 -rotate-12"
            />
            <img
              id="home-mobile-fist-5"
              src="/Assets/Logos/clutchFistLight.svg"
              alt=""
              width={72}
              height={72}
              className="absolute bottom-8 right-4 w-14 h-14 opacity-6 rotate-30"
            />
          </div>
          {desktopHomeContent}
          {mobileHomeContent}
          <div className="hidden sm:flex absolute bottom-5 left-1/2 -translate-x-1/2 w-full justify-center">
            <div
              ref={scrollIndicatorRef}
              className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 border border-white/20"
              style={{ visibility: "hidden", opacity: 0 }}
            >
              <p className="font-funnel-sans text-white text-[10px] xs:text-[12px] font-medium whitespace-nowrap">
                Scroll down to view recent project
              </p>
              <ArrowDownIcon className="w-3 h-3 xs:w-4 xs:h-4 text-white shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Infinite scroll social links */}
      <div className="flex items-center justify-center w-full">
        <InfiniteScrollSocials direction="left" />
      </div>
      {/* Infinite scroll Recent Projects text */}
      <div className="flex-center flex-row w-full overflow-hidden">
        <InfiniteScrollText
          text="Recent Projects"
          direction="left"
          className="font-funnel-sans text-white text-[42px] sm:text-[50px] md:text-[60px] lg:text-[72px] font-bold gradient-text whitespace-nowrap"
        />
      </div>

      <div className="flex flex-col w-full gap-5 px-3 pb-5 md:px-5 md:pb-5 rounded-xl">
        {RecentProjects.map((project, index) => (
          <Suspense
            key={project.id}
            fallback={<RecentProjectCardSkeleton index={index} />}
          >
            <RecentProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          </Suspense>
        ))}
      </div>
    </section>
  );
}
