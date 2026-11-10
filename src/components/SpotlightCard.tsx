"use client";
import React, { useRef } from "react";

/**
 * Card whose highlight follows the cursor (see `.spotlight-card` in globals.css).
 * Optional `tilt` adds a subtle 3D tilt toward the pointer.
 */
const SpotlightCard = ({
  children,
  className = "",
  tilt = false,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  as?: "div" | "article" | "li";
}) => {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt) {
      const rx = ((y / rect.height - 0.5) * -6).toFixed(2);
      const ry = ((x / rect.width - 0.5) * 6).toFixed(2);
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };

  const handleLeave = () => {
    if (tilt && ref.current) {
      ref.current.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`spotlight-card panel transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.4),0_24px_40px_-18px_rgba(0,0,0,0.9)] ${className}`}
    >
      {children}
    </Tag>
  );
};

export default SpotlightCard;
