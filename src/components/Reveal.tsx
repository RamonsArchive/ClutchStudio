"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades + slides children in when they scroll into view.
 * With `stagger`, each direct child animates in sequence.
 */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  y = 28,
  stagger = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? Array.from(el.children) : el;
      gsap.set(el, { visibility: "visible" });
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.8,
        delay,
        stagger: stagger || 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
};

export default Reveal;
