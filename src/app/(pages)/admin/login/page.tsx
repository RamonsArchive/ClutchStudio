import TitleSection from "@/components/TitleSection";
import React from "react";
import { AdminLoginData, SiteData } from "@/constants";
import LoginAdminForm from "@/components/LoginAdminForm";

const page = () => {
  const title = AdminLoginData.title;
  return (
    <section className="flex flex-col w-full h-full pb-20 gap-10 md:gap-16">
      <div className="relative grid min-h-[36dvh] w-full overflow-hidden">
        <TitleSection
          headerTitle={`${SiteData.domain} / Admin`}
          mainTitle={title}
          includeBackgroundIcons={true}
        />
      </div>
      <div className="section-shell">
        <LoginAdminForm />
      </div>
    </section>
  );
};

export default page;
