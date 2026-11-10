import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TitleSection from "@/components/TitleSection";
import ServicesSection from "@/components/ServicesSection";
import Reveal from "@/components/Reveal";
import { ServicesData } from "@/constants";

export const metadata: Metadata = {
  title: "Web Design & Hosting",
  description:
    "Custom website design, development, and managed hosting for businesses and organizations. Built and hosted by Ramon at rvector.dev.",
  alternates: { canonical: "/services" },
};

const ServicesPage = () => {
  const { text } = ServicesData;

  return (
    <section className="flex flex-col w-full pb-20 gap-14 md:gap-20">
      <div className="relative grid min-h-[42dvh] w-full overflow-hidden">
        <TitleSection
          headerTitle={text.eyebrow}
          mainTitle={text.title}
          subTitle={text.subtitle}
          includeBackgroundIcons={true}
          includeContactButton={true}
        />
      </div>

      <ServicesSection showHeading={false} showProcess={true} />

      <Reveal className="section-shell">
        <div className="panel rv-dot-grid flex flex-col items-start gap-5 p-8 md:p-12">
          <p className="eyebrow">Ready when you are</p>
          <h2 className="heading-display max-w-2xl">
            Tell me about your business and I&apos;ll tell you what I&apos;d
            build.
          </h2>
          <Link href="/contact" className="btn-primary">
            {text.cta}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
};

export default ServicesPage;
