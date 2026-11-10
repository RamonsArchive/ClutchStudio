"use client";
import React from "react";

const RecentProjectCardSkeleton = ({ index }: { index: number }) => {
  const isEven = index % 2 === 0;

  // One shimmering navy block; size comes from the className
  const block = (className: string) => (
    <div
      className={`bg-primary-background-800 animate-pulse shimmer-effect ${className}`}
    />
  );

  // Same layout as RecentProjectCard: image on top on mobile,
  // sides swap on every other card on desktop.
  return (
    <div
      aria-hidden="true"
      className={`panel flex flex-col w-full overflow-hidden ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Image skeleton */}
      <div className="w-full md:w-1/2 shrink-0 h-[calc(56vw+64px)] min-h-[250px] max-h-[70dvh] md:h-auto md:max-h-none md:min-h-[440px] p-2 md:p-3">
        {block("w-full h-full rounded-2xl")}
      </div>

      {/* Text skeleton */}
      <div className="flex flex-col justify-center w-full md:w-1/2 min-w-0 gap-4 md:gap-5 p-5 xs:p-6 md:p-8 lg:p-10">
        {/* Eyebrow skeleton */}
        {block("h-3 w-40 rounded-full")}

        {/* Title skeleton */}
        {block("h-9 md:h-11 w-3/4 rounded-lg")}

        {/* Description skeleton */}
        <div className="flex flex-col gap-2">
          {block("h-4 w-full rounded")}
          {block("h-4 w-5/6 rounded")}
          {block("h-4 w-1/2 rounded")}
        </div>

        {/* Tags skeleton */}
        <div className="flex flex-row flex-wrap items-center gap-2">
          {block("h-6 w-20 rounded-full")}
          {block("h-6 w-24 rounded-full")}
          {block("h-6 w-16 rounded-full")}
        </div>

        {/* Buttons skeleton */}
        <div className="flex flex-row flex-wrap gap-3 pt-2 md:pt-4">
          {block("h-11 w-36 rounded-full")}
          {block("h-11 w-36 rounded-full")}
        </div>
      </div>
    </div>
  );
};

export default RecentProjectCardSkeleton;
