"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TitleSection = ({
  headerTitle,
  mainTitle,
  subTitle,
  headerClassName,
  mainTitleClassName,
  subTitleClassName,
}: {
  headerTitle: React.ReactNode;
  mainTitle: React.ReactNode;
  subTitle: React.ReactNode;
  headerClassName?: string;
  mainTitleClassName?: string;
  subTitleClassName?: string;
}) => {
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    // Create SplitText instances
    const headerTitleElm = headerTitleRef.current;
    const mainTitleElm = mainTitleRef.current;
    const subTitleElm = subTitleRef.current;
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

    // Apply gradient effect immediately after SplitText creation for smoother experience
    if (mainTitleSplits.chars) {
      mainTitleSplits.chars.forEach((char, index) => {
        const charElement = char as HTMLElement;

        // Apply beautiful gradient styling directly to existing character
        charElement.style.background =
          "linear-gradient(45deg, #00D4FF, #0099FF, #00FF88, #00D4FF, #0099FF, #00FF88)";
        charElement.style.backgroundSize = "800% 800%";
        charElement.style.webkitBackgroundClip = "text";
        charElement.style.backgroundClip = "text";
        charElement.style.color = "transparent";
        charElement.style.webkitTextFillColor = "transparent";

        // Animate the gradient background position for smooth movement
        gsap.to(charElement.style, {
          backgroundPosition: "250% 100%",
          duration: 15,
          repeat: -1,
          ease: "power2.inOut",
          delay: index * 0.05, // Much smaller stagger for smoother flow
        });
      });
    }

    // Handle React nodes by extracting text content for the gradient effect
    let mainTitleText = "";
    if (typeof mainTitle === "string") {
      mainTitleText = mainTitle;
    } else if (React.isValidElement(mainTitle)) {
      // Extract text from React element
      const extractText = (node: React.ReactNode): string => {
        if (typeof node === "string") return node;
        if (typeof node === "number") return node.toString();
        if (React.isValidElement(node)) {
          const children = (node as any).props.children;
          if (Array.isArray(children)) {
            return children.map(extractText).join("");
          }
          return extractText(children);
        }
        return "";
      };
      mainTitleText = extractText(mainTitle);
    }

    console.log("Extracted main title text:", mainTitleText);

    // Don't set up gradient text yet - wait for animation to complete
    // if (mainTitleElm && mainTitleText) {
    //   const style = document.createElement("style");
    //   style.textContent = `
    //     #main-title::after {
    //       content: "${mainTitleText.replace(/"/g, '\\"')}";
    //     }
    //   `;
    //   document.head.appendChild(style);
    // }

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

    // Initial animation timeline
    const initialAnimationTL = gsap.timeline({
      onComplete: () => {
        console.log("Initial animation completed");

        // Setup scroll trigger animation after initial animation completes
        const scrollAnimationTL = gsap.timeline({
          scrollTrigger: {
            trigger: "#title-container",
            start: "top top",
            end: "bottom 40%",
            scrub: 0.8,
            markers: true,
          },
        });

        scrollAnimationTL.to(headerTitleSplits.words, {
          opacity: 0,
          yPercent: -100,
          duration: 0.3,
          stagger: 0.01,
        });

        scrollAnimationTL.to(mainTitleSplits.chars, {
          opacity: 0,
          yPercent: -100,
          duration: 0.3,
          stagger: 0.01,
        });

        scrollAnimationTL.to(subTitleSplits.words, {
          opacity: 0,
          yPercent: -100,
          duration: 0.3,
          stagger: 0.01,
        });
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
      <div className="flex justify-start flex-col md:flex-row gap-5 md:gap-15 cursor-pointer p-5">
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
        <div className="flex flex-col md:flex-center gap-5">
          {subTitle && (
            <h2
              id="sub-title"
              ref={subTitleRef}
              className={`${subTitleClassName}`}
            >
              {subTitle}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleSection;
