"use client";
import { HeroData } from "@/constants";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasScoredGoal, setHasScoredGoal] = useState(false);

  useGSAP(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Check if document.body exists (DOM is ready)
    if (typeof document === "undefined" || !document.body) return;

    const goalPopup = document.getElementById("goal-popup");
    if (goalPopup) {
      gsap.set(goalPopup, {
        opacity: 0,
        yPercent: -100,
      });
    }

    // Initially pause the video and set to beginning
    // video.pause();
    video.currentTime = 0;
    video.muted = true; // Ensure muted for autoplay

    // Create timeline with ScrollTrigger for real-time updates
    const videoTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=200vh",
        scrub: 0, // Real-time scrubbing - no delay
        onUpdate: (self) => {
          const progress = self.progress;
          const videoDuration = video.duration;

          // Check if we're past the 0.5 second mark for the goal moment
          if (video.currentTime >= 0.3 && !hasScoredGoal) {
            setHasScoredGoal(true);
          }

          let scale;
          if (progress <= 0.5) {
            // First 50%: grow from normal size to fill viewport
            scale = 1 + progress * 0.6; // 1 to 1.3 (fills viewport)
          } else {
            // Second 50%: stay at viewport size (no more growing)
            scale = 1.3; // Keep at viewport-filling size
          }

          gsap.set(container, {
            scale,
            ease: "power2.out",
          });
        },
        onEnter: () => {
          // Start playing when entering the trigger zone
          video.play().catch(() => {
            // Video autoplay blocked, will play on scroll
          });
        },
        onLeave: () => {
          // Keep playing even when leaving - this creates the infinite effect
          // Video continues playing as it grows infinitely
        },
        onEnterBack: () => {
          // Resume playing when scrolling back up
          video.play().catch(() => {
            // Video autoplay blocked, will play on scroll
          });
        },
        onLeaveBack: () => {
          // Pause when scrolling back up above trigger
          video.pause();
        },
      },
    });

    // Add the scaling animation to the timeline
    videoTl.to(container, {
      scale: 1.3, // Final scale value - fills viewport, no more growing
      ease: "power2.out",
      duration: 1, // This will be controlled by ScrollTrigger
    });

    // Clean up function
    return () => {
      // Kill the timeline and ScrollTrigger
      videoTl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-video"
      className="relative flex flex-1 w-full h-full bg-black overflow-hidden"
    >
      {hasScoredGoal && (
        <div
          id="goal-popup"
          className="absolute pointer-events-none flex-center w-full -translate-y-1/4 md:left-1/3 md:translate-y-0  md:-translate-x-1/2 inset-y-0 z-[100] animate-fade-in"
        >
          <div className="bg-black/80 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-4 border border-white/20">
            <h2 className="text-white text-center text-[14px] sm:text-[16px] md:text-[20px] font-bold">
              This is your moment! ☄️ 🤘
            </h2>
            <p className="text-white/90 text-center text-[12px] sm:text-[14x] md:text-[16px] mt-2">
              Team up with Clutch and make it happen
            </p>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        src={HeroData.HeroVideo}
        muted
        playsInline
        loop={true}
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedMetadata={() => {
          // Ensure video is ready for scrubbing
          // console.log("Video loaded and ready");
        }}
      />
      {/* Optional overlay for better text readability if needed */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
};

export default HeroVideo;
