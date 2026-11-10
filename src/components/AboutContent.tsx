"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { ArrowLeft, ArrowRight, ArrowUpRight, Download } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import Reveal from "@/components/Reveal";
import AboutExperience, {
  AboutExperienceItem,
} from "@/components/AboutExperience";

gsap.registerPlugin(ScrollTrigger, SplitText);

const RESUME_HREF = "/Assets/Documents/ramon_resume.pdf";

const pad = (n: number) => String(n).padStart(2, "0");

const AboutContent = ({
  subtitle,
  introduction,
  education,
  releventCoursework,
  favoriteTools,
  technicalSkills,
  images,
  workExperience,
}: {
  subtitle: string;
  introduction: string;
  education: string;
  releventCoursework: string[];
  favoriteTools: { title: string; svg: string }[];
  technicalSkills: { [key: string]: string[] };
  images: string[];
  workExperience: {
    title: string;
    subtitle: string;
    experience: AboutExperienceItem[];
  };
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const introductionRef = useRef<HTMLParagraphElement>(null);
  const [activeImage, setActiveImage] = useState(0);

  const currentRole = workExperience.experience[0];
  // Facts list — every value comes straight from src/constants
  const facts = currentRole
    ? [
        { label: "Based in", value: currentRole.location },
        {
          label: "Currently",
          value: `${currentRole.position} at ${currentRole.company}`,
        },
        { label: "Since", value: currentRole.duration },
      ]
    : [];

  const showImage = (index: number) => {
    const total = images.length;
    if (total === 0) return;
    setActiveImage(((index % total) + total) % total);
  };

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduceMotion) return;

      // Portrait + thumbnails slide in on load
      gsap.from(galleryRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".about-thumb", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
        delay: 0.55,
      });

      // Introduction lights up word by word as you scroll through it
      const introductionSplit = SplitText.create(introductionRef.current, {
        type: "words",
      });
      gsap.fromTo(
        introductionSplit.words,
        { opacity: 0.2 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: introductionRef.current,
            start: "top 85%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        }
      );

      return () => {
        introductionSplit.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col w-full">
      {/* 01 / INTRODUCTION */}
      <section className="section-shell flex flex-col gap-10 md:gap-14 py-14 md:py-24">
        <Reveal>
          <SectionHeading index="01" label="Introduction" title={subtitle} />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-start">
          {/* Photo gallery */}
          <div ref={galleryRef} className="flex flex-col gap-3 w-full">
            <figure className="flex flex-col gap-3">
              <div className="group relative w-full aspect-square lg:aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-primary-background-900">
                {images.map((image, index) => (
                  <Image
                    key={image}
                    src={image}
                    alt={`Personal photo ${index + 1} of ${images.length}`}
                    fill
                    sizes="(min-width: 1024px) 440px, 100vw"
                    priority={index === 0}
                    className={`about-image object-cover object-top transition-all duration-700 ease-out ${
                      index === activeImage
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  />
                ))}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-primary-background-950/80 to-transparent" />

                {images.length > 1 && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => showImage(activeImage - 1)}
                      aria-label="Previous photo"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-primary-background-950/70 text-white backdrop-blur-sm transition-colors duration-300 hover:border-primary-400 hover:text-primary-300"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => showImage(activeImage + 1)}
                      aria-label="Next photo"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-primary-background-950/70 text-white backdrop-blur-sm transition-colors duration-300 hover:border-primary-400 hover:text-primary-300"
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                )}
              </div>

              <figcaption className="flex items-center justify-between font-mono text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-slate-400">
                <span>
                  <span className="text-secondary-400">Fig.</span>{" "}
                  {pad(activeImage + 1)}
                </span>
                <span>
                  {pad(activeImage + 1)} / {pad(images.length)}
                </span>
              </figcaption>
            </figure>

            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 md:gap-3">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => showImage(index)}
                    aria-label={`Show photo ${index + 1}`}
                    aria-pressed={index === activeImage}
                    className={`about-thumb relative aspect-square overflow-hidden rounded-xl border transition-all duration-300 ${
                      index === activeImage
                        ? "border-primary-400 opacity-100"
                        : "border-white/10 opacity-50 hover:opacity-100 hover:border-white/30"
                    }`}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 110px, 25vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Intro copy + facts */}
          <div className="flex min-w-0 flex-col gap-10">
            <p
              ref={introductionRef}
              className="font-funnel-sans text-white text-[18px] md:text-[22px] lg:text-[24px] leading-relaxed break-words"
            >
              {introduction}
            </p>

            {facts.length > 0 && (
              <Reveal stagger={0.08}>
                {facts.map((fact, index) => (
                  <div
                    key={fact.label}
                    className="grid grid-cols-[28px_1fr] sm:grid-cols-[28px_140px_1fr] items-baseline gap-x-4 gap-y-1 border-t border-white/10 py-4 last:border-b"
                  >
                    <span className="font-mono text-[11px] md:text-[12px] tracking-[0.18em] text-secondary-400">
                      {pad(index + 1)}
                    </span>
                    <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-primary-400">
                      {fact.label}
                    </span>
                    <span className="col-start-2 sm:col-start-3 font-funnel-sans text-white text-[15px] md:text-[17px] break-words">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </Reveal>
            )}

            <Reveal className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={RESUME_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow group"
              >
                Resume
                <Download
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden
                />
              </a>
              <Link href="/projects" className="link-arrow group">
                Projects
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 / EXPERIENCE */}
      <section className="border-t border-white/10">
        <div className="section-shell flex flex-col gap-10 md:gap-14 py-14 md:py-24">
          <Reveal>
            <SectionHeading
              index="02"
              label="Experience"
              title={workExperience.title}
              description={workExperience.subtitle}
            />
          </Reveal>
          <AboutExperience experience={workExperience.experience} />
        </div>
      </section>

      {/* 03 / EDUCATION */}
      <section className="border-t border-white/10">
        <div className="section-shell grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start py-14 md:py-24">
          <Reveal className="flex flex-col gap-6">
            <SectionHeading index="03" label="Education" title="Education" />
            <p className="body-copy max-w-[60ch]">{education}</p>
          </Reveal>

          <Reveal>
            <div className="panel flex flex-col gap-5 p-5 md:p-8">
              <h3 className="eyebrow">Relevant Coursework</h3>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                {releventCoursework.map((course, index) => (
                  <li
                    key={course}
                    className="group flex items-baseline gap-3 border-t border-white/10 py-3"
                  >
                    <span className="font-mono text-[11px] md:text-[12px] tracking-[0.18em] text-slate-500 transition-colors duration-300 group-hover:text-secondary-400">
                      {pad(index + 1)}
                    </span>
                    <span className="font-funnel-sans text-slate-200 text-[14px] md:text-[16px] break-words transition-colors duration-300 group-hover:text-white">
                      {course}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 04 / TOOLKIT */}
      <section className="border-t border-white/10">
        <div className="section-shell flex flex-col gap-10 md:gap-14 py-14 md:py-24">
          <Reveal>
            <SectionHeading index="04" label="Toolkit" title="Tools & Skills" />
          </Reveal>

          {/* Favorite tools */}
          <div className="flex flex-col gap-5">
            <h3 className="eyebrow">Favorite Tools</h3>
            <Reveal
              stagger={0.06}
              className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
            >
              {favoriteTools.map(({ title, svg }) => (
                // Wrapper div: Reveal animates it, so GSAP doesn't fight the card's CSS transition
                <div key={title}>
                  <SpotlightCard className="group flex h-full flex-col items-center gap-4 px-3 py-6 md:py-8">
                    {/* Light chip so dark icons (Next.js) stay visible on navy */}
                    <span className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-primary-background-50 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105">
                      <Image
                        src={svg}
                        alt=""
                        width={40}
                        height={40}
                        className="h-8 w-8 md:h-10 md:w-10 object-contain"
                      />
                    </span>
                    <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-slate-300 text-center break-words transition-colors duration-300 group-hover:text-white">
                      {title}
                    </span>
                  </SpotlightCard>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Technical skills */}
          <div className="flex flex-col gap-5">
            <h3 className="eyebrow">Technical Skills</h3>
            <Reveal stagger={0.08} className="flex flex-col">
              {Object.entries(technicalSkills).map(([key, value], index) => (
                <div
                  key={key}
                  className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-3 md:gap-8 border-t border-white/10 py-5 md:py-6 last:border-b"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] md:text-[12px] tracking-[0.18em] text-secondary-400">
                      {pad(index + 1)}
                    </span>
                    <h4 className="font-funnel-sans text-white text-[16px] md:text-[18px] font-semibold capitalize">
                      {key.replace(/_/g, " ")}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {value.map((v) => (
                      <span
                        key={v}
                        className="chip transition-colors duration-300 hover:border-primary-400/60 hover:text-white cursor-default"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="section-shell pb-16 md:pb-24">
        <Reveal>
          <div className="panel relative overflow-hidden p-6 md:p-12">
            <div className="pointer-events-none absolute inset-0 rv-dot-grid opacity-60" />
            <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="flex flex-col gap-4">
                <p className="eyebrow">Next</p>
                <h2 className="heading-display">
                  Let&apos;s <span className="gradient-text">connect</span>.
                </h2>
              </div>
              <div className="flex flex-col xs:flex-row flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Get in touch
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link href="/projects" className="btn-secondary">
                  View projects
                </Link>
                <a
                  href={RESUME_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Resume
                  <Download className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
            <div className="rv-divider absolute inset-x-0 bottom-0" />
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default AboutContent;
