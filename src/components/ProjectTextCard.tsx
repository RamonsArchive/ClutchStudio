import { ProjectTemplate } from "@/types/GlobalTypes";
import React from "react";

const ProjectTextCard = ({ data }: { data: ProjectTemplate }) => {
  return (
    <div className="flex flex-col gap-6 bg-primary-background-900 rounded-xl p-6 shadow-lg">
      <h2 className="font-funnel-sans text-white text-[28px] sm:text-[32px] font-bold leading-tight">
        {data.text.title}
      </h2>

      {/* Purple accent divider */}
      <div className="w-18 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full shadow-sm"></div>

      <p className="font-funnel-sans text-white/90 text-[15px] sm:text-[16px] font-light leading-relaxed max-w-2xl">
        {data.text.personalDescription}
      </p>
    </div>
  );
};

export default ProjectTextCard;
