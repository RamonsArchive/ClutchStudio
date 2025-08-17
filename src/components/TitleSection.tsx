"use client";
import React from "react";

const TitleSection = () => {
  return (
    <div className="flex-center flex-col gap-10 p-5 h-[25%] w-full bg-primary-background-500">
      <div className="flex-center flex-col gap-5 cursor-pointer">
        <h1 className="text-text-inverse text-[24px] font-bold cursor-pointer">
          Welcome to the Title Section
        </h1>
        <p className="text-text-inverse text-[16px]">
          This is the title section of the page.
        </p>
      </div>
    </div>
  );
};

export default TitleSection;
