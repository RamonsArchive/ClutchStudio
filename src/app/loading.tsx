import React from "react";
import { Loader } from "lucide-react";

const loading = () => {
  return (
    <div className="inset-0 w-full h-[100dvh] flex flex-col items-center justify-center bg-primary-background-500">
      <div className="flex flex-col gap-3 items-center justify-center w-full h-[100dvh]">
        <Loader className="w-10 h-10 animate-spin" />
        <h1 className="font-funnel-sans text-white text-[20px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-bold break-words">
          Loading...
        </h1>
      </div>
    </div>
  );
};

export default loading;
