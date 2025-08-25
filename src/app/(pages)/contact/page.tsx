import TitleSection from "@/components/TitleSection";
import React from "react";
import { ContactData } from "@/constants";
import ContactForm from "@/components/ContactForm";
const ContactPage = () => {
  const title = ContactData.text.title;
  const subtitle = ContactData.text.subtitle;
  const subsubtitle = ContactData.text.subsubtitle;

  return (
    <section className="flex flex-col w-[100dvw] h-full pb-15 gap-10">
      <div className="relative flex flex-col h-[calc(50dvh-43px)] w-full overflow-hidden">
        <TitleSection
          mainTitle={title}
          mainTitleClassName="font-funnel-sans text-white text-[58px] xs:text-[68px] sm:text-[78px] md:text-[84px] lg:text-[100px] font-bold break-words"
          includeBackgroundIcons={true}
          useCharsForMainTitle={true}
        />
      </div>
      <div className="flex flex-col w-full p-3 md:p-10">
        <ContactForm
          subtitle={subtitle}
          subsubtitle={subsubtitle}
          services={ContactData.services}
        />
      </div>
    </section>
  );
};

export default ContactPage;
