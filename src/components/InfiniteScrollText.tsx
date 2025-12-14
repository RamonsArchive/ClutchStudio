"use client";

import React, { useRef, useEffect, useState } from "react";

const InfiniteScrollText = ({
  text,
  direction = "left",
  className = "",
}: {
  text: string;
  direction?: "left" | "right";
  className?: string;
}) => {
  const firstSetRef = useRef<HTMLDivElement>(null);
  const secondSetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const measureWidth = () => {
      requestAnimationFrame(() => {
        if (
          firstSetRef.current &&
          secondSetRef.current &&
          containerRef.current
        ) {
          const firstSetLeft = firstSetRef.current.offsetLeft;
          const secondSetLeft = secondSetRef.current.offsetLeft;
          const distance = secondSetLeft - firstSetLeft;
          setScrollDistance(direction === "left" ? -distance : distance);
        }
      });
    };

    const timeoutId = setTimeout(measureWidth, 100);
    window.addEventListener("resize", measureWidth);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", measureWidth);
    };
  }, [text, direction]);

  return (
    <div className="overflow-hidden w-full min-w-0 flex items-center justify-center py-4">
      <div
        ref={containerRef}
        className="flex flex-row gap-10 relative items-center"
        style={
          {
            animation: scrollDistance
              ? `scroll-${direction} ${20}s linear infinite`
              : "none",
            "--scroll-distance": `${Math.abs(scrollDistance)}px`,
          } as React.CSSProperties & { "--scroll-distance": string }
        }
      >
        {/* First set */}
        <div ref={firstSetRef} className="flex items-center gap-10 shrink-0">
          <h2 className={className}>{text}</h2>
        </div>

        {/* Duplicate sets for seamless loop */}
        <div ref={secondSetRef} className="flex items-center gap-10 shrink-0">
          <h2 className={className}>{text}</h2>
        </div>

        {/* Third duplicate set */}
        <div className="flex items-center gap-10 shrink-0">
          <h2 className={className}>{text}</h2>
        </div>

        {/* Fourth duplicate set */}
        <div className="xs:flex hidden items-center gap-10 shrink-0">
          <h2 className={className}>{text}</h2>
        </div>

        {/* Fifth duplicate set */}
        <div className="xs:flex hidden items-center gap-10 shrink-0">
          <h2 className={className}>{text}</h2>
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollText;
