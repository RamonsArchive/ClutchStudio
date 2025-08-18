import TitleSection from "./TitleSection";
import React from "react";

const Hero = () => {
  return (
    <div className="flex h-[200vh] w-full overflow-y-auto scrollbar-hide">
      <TitleSection
        headerTitle="Software solutions in San Diego, California "
        mainTitle={
          <>
            One point from the win.{" "}
            <span className="font-bold">
              We design, build, and optimize—so you score first.
            </span>
          </>
        }
        subTitle={
          <>
            Web + ML/DS focus{" "}
            <span className="font-bold">
              High‑performance websites, plus machine‑learning and data‑science
            </span>{" "}
            solutions that drive revenue.
          </>
        }
        headerClassName="font-funnel-sans text-white text-[12px] xs:text-[16px] font-light italic"
        mainTitleClassName="font-funnel-sans text-white text-[26px] xs:text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold"
        subTitleClassName="font-funnel-sans text-white text-[12px] xs:text-[16px] font-regular"
        includeContactButton={true}
      />
      <div className="flex flex-col gap-5"></div>
    </div>
  );
};

export default Hero;
