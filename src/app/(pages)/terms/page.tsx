import React from "react";
import Link from "next/link";
import { TermsOfService } from "@/constants";
import TitleSection from "@/components/TitleSection";

const TermsPage = () => {
  return (
    <div className="flex flex-col w-[100dvw] gap-10 md:gap-15 scrollbar-hide">
      <div className="relative flex flex-col h-[calc(50dvh-43px)] w-full overflow-hidden">
        <TitleSection
          mainTitle={"Terms of Service"}
          mainTitleClassName="font-funnel-sans text-white text-[58px] xs:text-[68px] sm:text-[78px] md:text-[84px] lg:text-[100px] font-bold break-words"
          includeBackgroundIcons={true}
        />
      </div>

      <div className="flex flex-col gap-y-6 w-full px-5 sm:px-10 pb-10 ">
        <div className="flex flex-col gap-y-8 max-w-4xl p-5 md:p-10 mx-auto w-full rounded-2xl bg-gradient-to-br from-primary-background-900/80 via-primary-800/90 to-secondary-900/90 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="text-center mb-6">
            <p className="font-plex-sans font-light text-[12px] sm:text-[14px] text-white/70">
              Last updated: 08/24/2025
            </p>
          </div>

          <div className="flex flex-col gap-y-8 w-full">
            {TermsOfService.map((term) => (
              <div key={term.id} className="flex flex-col gap-y-3 p-6">
                <h2 className="font-plex-sans font-semibold text-[16px] sm:text-[18px] md:text-[20px] text-white">
                  {term.id}. {term.title}
                </h2>
                <p className="font-plex-sans font-light text-[12px] sm:text-[14px] text-white/80 leading-relaxed">
                  {term.content}
                </p>
              </div>
            ))}

            <div className="flex justify-center mt-8">
              <Link href="/">
                <button className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-semibold text-[14px] sm:text-[16px] rounded-xl transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
