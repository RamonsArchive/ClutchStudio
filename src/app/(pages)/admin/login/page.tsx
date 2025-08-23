import TitleSection from "@/components/TitleSection";
import React from "react";
import { AdminLoginData } from "@/constants";
import LoginAdminForm from "@/components/LoginAdminForm";

const page = () => {
  const title = AdminLoginData.title;
  return (
    <section className="flex flex-col w-[100dvw] h-full pb-15 gap-10">
      <div className="relative flex flex-col h-[calc(50dvh-43px)] w-full overflow-hidden">
        <TitleSection
          mainTitle={title}
          mainTitleClassName="font-funnel-sans text-white text-[58px] xs:text-[68px] sm:text-[78px] md:text-[84px] lg:text-[100px] font-bold break-words"
          includeBackgroundIcons={true}
        />
      </div>
      <LoginAdminForm />
    </section>
  );
};

export default page;
