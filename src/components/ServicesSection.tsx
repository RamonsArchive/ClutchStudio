import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Code2,
  LayoutDashboard,
  Plug,
  Search,
  Server,
  Wrench,
} from "lucide-react";
import { ServicesData } from "@/constants";
import SpotlightCard from "./SpotlightCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const serviceIcons: Record<string, React.ReactElement> = {
  code: <Code2 className="w-5 h-5" />,
  server: <Server className="w-5 h-5" />,
  dashboard: <LayoutDashboard className="w-5 h-5" />,
  plug: <Plug className="w-5 h-5" />,
  search: <Search className="w-5 h-5" />,
  wrench: <Wrench className="w-5 h-5" />,
};

/**
 * Web design + hosting offering.
 * Used on the home page (compact) and on /services (full, with process).
 */
const ServicesSection = ({
  index = "02",
  showProcess = false,
  showHeading = true,
}: {
  index?: string;
  showProcess?: boolean;
  showHeading?: boolean;
}) => {
  const { text, services, process, clients } = ServicesData;

  return (
    <section
      id="services"
      className="section-shell flex flex-col gap-10 md:gap-14 scroll-mt-24"
    >
      {showHeading && (
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <SectionHeading
              index={index}
              label={text.eyebrow}
              title={text.title}
              description={text.subtitle}
            />
            <Link href="/contact" className="btn-primary shrink-0 w-fit">
              {text.cta}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      )}

      {/* What I offer */}
      <Reveal
        stagger={0.08}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
      >
        {services.map((service, i) => (
          <SpotlightCard
            key={service.id}
            className="flex flex-col gap-4 p-6 md:p-7 h-full"
          >
            <div className="flex items-center justify-between">
              <span className="flex-center w-11 h-11 rounded-xl border border-primary-500/30 bg-primary-500/10 text-primary-300">
                {serviceIcons[service.icon]}
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                0{i + 1}
              </span>
            </div>
            <h3 className="font-funnel-sans text-white text-[18px] md:text-[20px] font-semibold">
              {service.title}
            </h3>
            <p className="font-funnel-sans text-slate-400 text-[14px] md:text-[15px] leading-relaxed">
              {service.description}
            </p>
          </SpotlightCard>
        ))}
      </Reveal>

      {/* How it works */}
      {showProcess && (
        <div className="flex flex-col gap-6">
          <Reveal>
            <p className="eyebrow">How it works</p>
          </Reveal>
          <Reveal
            stagger={0.1}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
          >
            {process.map((step) => (
              <div
                key={step.step}
                className="flex flex-col gap-3 bg-primary-background-900 p-6 md:p-7"
              >
                <span className="font-mono text-[28px] md:text-[34px] font-bold text-secondary-500 leading-none">
                  {step.step}
                </span>
                <h3 className="font-funnel-sans text-white text-[17px] md:text-[18px] font-semibold">
                  {step.title}
                </h3>
                <p className="font-funnel-sans text-slate-400 text-[14px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      )}

      {/* Sites I've built and run */}
      <div className="flex flex-col gap-6">
        <Reveal>
          <div className="flex items-center gap-4">
            <p className="eyebrow shrink-0">Sites I&apos;ve built &amp; run</p>
            <span className="rv-divider" />
          </div>
        </Reveal>
        <Reveal
          stagger={0.08}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {clients.map((client) => (
            <SpotlightCard key={client.id} className="group flex flex-col">
              <Link
                href={`/projects/${client.id}`}
                className="relative block aspect-[4/3] w-full overflow-hidden rounded-t-2xl"
              >
                <Image
                  src={client.images.mainImage}
                  alt={`${client.text.name} website`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary-background-900 via-transparent to-transparent" />
              </Link>
              <div className="flex flex-col gap-2 p-5">
                <h3 className="font-funnel-sans text-white text-[16px] md:text-[17px] font-semibold">
                  {client.text.name}
                </h3>
                <p className="font-funnel-sans text-slate-400 text-[13px] leading-relaxed line-clamp-2">
                  {client.text.subName}
                </p>
                {client.websiteUrl && (
                  <a
                    href={client.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow group/link mt-1 w-fit normal-case! tracking-normal!"
                  >
                    {client.websiteUrl.replace("https://", "")}
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </SpotlightCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default ServicesSection;
