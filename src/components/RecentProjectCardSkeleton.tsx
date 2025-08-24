"use client";
import React from "react";

const RecentProjectCardSkeleton = ({ index }: { index: number }) => {
  const isEven = index % 2 === 0;

  const renderTextContentSkeleton = () => {
    return (
      <div className="flex flex-col w-full h-full gap-5 px-5 py-3 sm:p-10">
        {/* Title skeleton */}
        <div className="h-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg animate-pulse shimmer-effect" />

        {/* Tags skeleton */}
        <div className="flex flex-row items-center gap-3">
          <div className="h-6 w-20 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full animate-pulse shimmer-effect" />
          <div className="h-4 w-2 bg-gray-600 rounded-full" />
          <div className="h-6 w-24 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full animate-pulse shimmer-effect" />
          <div className="h-4 w-2 bg-gray-600 rounded-full" />
          <div className="h-6 w-16 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full animate-pulse shimmer-effect" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-pulse shimmer-effect" />
          <div className="h-4 w-3/4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-pulse shimmer-effect" />
          <div className="h-4 w-1/2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-pulse shimmer-effect" />
        </div>

        {/* Buttons skeleton */}
        <div className="flex w-full mt-8 flex-row gap-3 md:gap-5">
          <div className="h-10 w-24 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg animate-pulse shimmer-effect" />
          <div className="h-10 w-32 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg animate-pulse shimmer-effect" />
        </div>
      </div>
    );
  };

  const renderImageSkeleton = () => {
    return (
      <div className="flex flex-col w-full h-[50dvh] bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg animate-pulse shimmer-effect" />
    );
  };

  return (
    <>
      {/* Mobile skeleton */}
      <div className="flex flex-col gap-3 w-full pb-6 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 overflow-x-hidden rounded-xl">
        <div className="flex flex-col w-full h-[50dvh]">
          {renderImageSkeleton()}
        </div>
        <div className="flex flex-col flex-1 w-full h-full px-5 py-3 gap-5 overflow-x-hidden">
          {/* Title skeleton */}
          <div className="h-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg animate-pulse shimmer-effect" />

          {/* Tags skeleton */}
          <div className="flex flex-row items-center gap-3">
            <div className="h-6 w-20 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full animate-pulse shimmer-effect" />
            <div className="h-4 w-2 bg-gray-600 rounded-full" />
            <div className="h-6 w-24 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full animate-pulse shimmer-effect" />
            <div className="h-4 w-2 bg-gray-600 rounded-full" />
            <div className="h-6 w-16 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full animate-pulse shimmer-effect" />
          </div>

          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-pulse shimmer-effect" />
            <div className="h-4 w-3/4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-pulse shimmer-effect" />
            <div className="h-4 w-1/2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-pulse shimmer-effect" />
          </div>

          {/* Buttons skeleton */}
          <div className="flex w-full mt-5 flex-row gap-3">
            <div className="h-10 w-24 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg animate-pulse shimmer-effect" />
            <div className="h-10 w-32 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg animate-pulse shimmer-effect" />
          </div>
        </div>
      </div>

      {/* Desktop skeleton */}
      <div className="hidden md:flex flex-row gap-3 w-full bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 overflow-x-hidden rounded-xl">
        <div className="flex flex-col w-1/2">
          {isEven ? renderTextContentSkeleton() : renderImageSkeleton()}
        </div>
        <div className="flex flex-col flex-1">
          {isEven ? renderImageSkeleton() : renderTextContentSkeleton()}
        </div>
      </div>
    </>
  );
};

export default RecentProjectCardSkeleton;
