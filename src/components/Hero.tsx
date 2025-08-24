import TitleSection from "./TitleSection";
import HeroVideo from "./HeroVideo";
import React from "react";
import RecentProjectCard from "./RecentProjectCard";
import { RecentProjects } from "@/constants";
import CreateAdminForm from "./Admin/CreateAdminForm";

const Hero = () => {
  return (
    <section className="flex flex-col w-[100dvw] overflow-y-auto scrollbar-hide gap-5 pb-15">
      <div className="flex flex-col h-[calc(100vh-43px)] w-full overflow-hidden">
        <div className="relative flex h-[50%] w-full">
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
                  High‑performance websites, plus machine‑learning and
                  data‑science
                </span>{" "}
                solutions that drive revenue.
              </>
            }
            headerClassName="font-funnel-sans text-white text-[12px] xs:text-[14px] md:text-[16px] font-light italic break-words"
            mainTitleClassName="font-funnel-sans text-white text-[26px] xs:text-[28px] sm:text-[32px] md:text-[40px] lg:text-[52px] font-bold break-words"
            subTitleClassName="font-funnel-sans text-white text-[12px] xs:text-[14px] md:text-[16px] font-regular break-words"
            includeContactButton={true}
          />
        </div>
        {/* Hero Video - Infinite scroll effect */}

        <HeroVideo />
      </div>
      <div className="flex flex-col flex-1 gap-10">
        <div className="flex-center flex-row gap-3 py-2 w-full overflow-hidden">
          <div className="sliding-text-container">
            <div className="sliding-text-track">
              <h2 className="font-funnel-sans text-white text-[42px] sm:text-[50px] md:text-[60px] lg:text-[72px] font-bold gradient-text">
                Recent Projects
              </h2>
              <h2 className="font-funnel-sans text-white text-[42px] sm:text-[50px] md:text-[60px] lg:text-[72px] font-bold gradient-text">
                Recent Projects
              </h2>
              <h2 className="font-funnel-sans text-white text-[42px] sm:text-[50px] md:text-[60px] lg:text-[72px] font-bold gradient-text">
                Recent Projects
              </h2>
              <h2 className="font-funnel-sans text-white text-[42px] sm:text-[50px] md:text-[60px] lg:text-[72px] font-bold gradient-text">
                Recent Projects
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-15 px-3 pb-5 xs:px-5 xs:pb-5 md:px-10 md:pb-10 rounded-xl">
        {RecentProjects.map((project, index) => (
          <RecentProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
