"use client";
import React, { Suspense, useRef } from "react";
import RecentProjectCard from "@/components/RecentProjectCard";
import { HeroStats, RecentProjects, SiteData } from "@/constants";
import RecentProjectCardSkeleton from "@/components/RecentProjectCardSkeleton";
import Image from "next/image";
import Link from "next/link";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { ArrowDownIcon, ArrowUpRight } from "lucide-react";
import InfiniteScrollSocials from "@/components/InfiniteScrollSocials";
import InfiniteScrollText from "@/components/InfiniteScrollText";
import ServicesSection from "@/components/ServicesSection";
import { RESUME_HREF } from "@/constants/links_index";
import VectorField from "@/components/VectorField";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, SplitText);

const marqueeItems = [
  "Next.js",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Prisma",
  "Python",
  "Machine Learning",
  "Web Design",
  "Managed Hosting",
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const beaverRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!titleRef.current || !heroRef.current) return;

      // Split the title into characters for the entrance animation
      const titleSplit = SplitText.create(titleRef.current, {
        type: "chars,words",
      });

      gsap.set(titleRef.current, { visibility: "visible" });

      // Depth: each layer sits at a different distance from the viewer
      gsap.set(plateRef.current, { z: -60 });
      gsap.set(photoRef.current, { z: 0 });
      gsap.set(badgeRef.current, { z: 50 });
      gsap.set(terminalRef.current, { z: 70 });
      gsap.set(beaverRef.current, { z: 110 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-meta", {
        opacity: 0,
        y: -12,
        duration: 0.6,
        stagger: 0.08,
      })
        .from(
          titleSplit.chars,
          {
            opacity: 0,
            yPercent: 80,
            rotateX: -60,
            duration: 0.8,
            stagger: 0.03,
          },
          "-=0.3"
        )
        .from(
          ".hero-fade",
          { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 },
          "-=0.45"
        )
        .from(
          photoRef.current,
          { opacity: 0, y: 60, rotate: 6, duration: 1, ease: "power4.out" },
          0.25
        )
        .from(
          plateRef.current,
          { opacity: 0, x: -16, y: -16, duration: 0.8 },
          0.6
        )
        .from(
          terminalRef.current,
          { opacity: 0, y: 30, duration: 0.7, ease: "back.out(1.4)" },
          0.8
        )
        .from(
          ".terminal-line",
          { opacity: 0, duration: 0.01, stagger: 0.28 },
          1.2
        )
        .from(
          beaverRef.current,
          {
            opacity: 0,
            scale: 0.6,
            rotate: -14,
            duration: 0.9,
            ease: "back.out(1.6)",
          },
          0.7
        )
        .from(
          badgeRef.current,
          { opacity: 0, scale: 0.5, duration: 0.7, ease: "back.out(1.8)" },
          0.9
        )
        .from(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10, duration: 0.6 },
          "-=0.2"
        );

      // Continuous bounce on the scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.4,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      // Count-up stats
      const counters = gsap.utils.toArray<HTMLElement>(".stat-value");
      counters.forEach((el) => {
        const target = Number(el.dataset.value || 0);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 92%" },
          onUpdate: () => {
            el.textContent = Math.round(counter.value).toString();
          },
        });
      });

      // Mouse parallax on the hero visual (desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (pointer: fine)", () => {
        const hero = heroRef.current!;
        // Tilt the whole stage; the layers separate because they sit at
        // different depths (see the z values above)
        const tiltX = gsap.quickTo(stageRef.current, "rotationX", {
          duration: 0.7,
          ease: "power3.out",
        });
        const tiltY = gsap.quickTo(stageRef.current, "rotationY", {
          duration: 0.7,
          ease: "power3.out",
        });

        const handleMove = (e: MouseEvent) => {
          const rect = hero.getBoundingClientRect();
          const dx = (e.clientX - rect.left) / rect.width - 0.5;
          const dy = (e.clientY - rect.top) / rect.height - 0.5;
          tiltY(dx * 14);
          tiltX(dy * -10);
        };
        const handleLeave = () => {
          tiltX(0);
          tiltY(0);
        };

        hero.addEventListener("mousemove", handleMove);
        hero.addEventListener("mouseleave", handleLeave);
        return () => {
          hero.removeEventListener("mousemove", handleMove);
          hero.removeEventListener("mouseleave", handleLeave);
        };
      });

      // Hero visual drifts up as you scroll away
      gsap.to(visualRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      return () => {
        titleSplit.revert();
        mm.revert();
      };
    },
    { scope: heroRef }
  );

  return (
    <section className="flex flex-col w-full overflow-x-hidden gap-20 md:gap-28 pb-20">
      {/* ------------------------------------------------------------------
          Hero
      ------------------------------------------------------------------- */}
      <div
        ref={heroRef}
        className="relative flex flex-col w-full min-h-[calc(100dvh-64px)] overflow-hidden border-b border-white/10 bg-linear-to-b from-primary-background-900 via-primary-background-950 to-primary-background-950"
      >
        {/* Background */}
        <VectorField />
        <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rv-glow-cyan" />
        <div className="pointer-events-none absolute -bottom-40 -right-24 h-[560px] w-[560px] rv-glow-orange" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-primary-background-950 to-transparent" />

        {/* Side rails (desktop) */}
        <div className="hidden xl:flex absolute left-5 top-0 h-full items-center pointer-events-none">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 [writing-mode:vertical-rl] rotate-180">
            Selected work · MMXXVI · California
          </p>
        </div>
        <div className="hidden xl:flex absolute right-5 top-0 h-full items-center pointer-events-none">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 [writing-mode:vertical-rl]">
            Scroll · Read
          </p>
        </div>

        <div className="section-shell relative z-10 flex flex-1 flex-col gap-8 py-8 md:py-10">
          {/* Meta row */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em]">
            <div className="hero-meta flex flex-col gap-1.5">
              <p className="flex items-center gap-2 text-slate-200">
                <span className="status-dot" />
                Portfolio Nº 01
              </p>
              <p className="text-slate-500">Full-stack · ML · Hosting</p>
            </div>
            <div className="hero-meta hidden lg:flex flex-col gap-1.5 text-center">
              <p className="text-slate-200">San Diego · California</p>
              <p className="text-slate-500">32°42′ N · 117°09′ W</p>
            </div>
            <div className="hero-meta flex flex-col gap-1.5 text-right">
              <p className="text-slate-200">Currently</p>
              <p className="text-slate-500">Software Engineer @ ModalAI</p>
            </div>
          </div>

          {/* Main */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 flex-1 items-center">
            {/* Text */}
            <div className="lg:col-span-7 flex flex-col gap-5 md:gap-6">
              <h1
                ref={titleRef}
                className="font-funnel-sans text-white font-bold tracking-tight leading-[0.95] text-[56px] xs:text-[64px] sm:text-[84px] lg:text-[84px] xl:text-[96px]"
                style={{ visibility: "hidden", perspective: 800 }}
              >
                Hi, I&apos;m <span className="text-primary-400">Ramon</span>
                <span className="text-secondary-500">.</span>
              </h1>

              <p
                ref={taglineRef}
                className="hero-fade font-mono text-[14px] xs:text-[15px] md:text-[18px] text-slate-200"
              >
                <span className="text-secondary-400">&gt;</span> I build it,
                ship it, and host it
                <span className="cursor-blink" />
              </p>

              <p className="hero-fade body-copy max-w-xl">
                I&apos;m a software engineer at ModalAI and a student at UC San
                Diego. Look around to see my full-stack and machine learning
                projects. I also design, build, and host websites for
                businesses.
              </p>

              <div className="hero-fade flex flex-col xs:flex-row flex-wrap gap-3 pt-1">
                <Link href="/projects" className="btn-primary">
                  View projects
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link href="/services" className="btn-secondary">
                  Web design &amp; hosting
                </Link>
                <a href={RESUME_HREF} download className="btn-ghost">
                  Resume
                </a>
              </div>
            </div>

            {/* Visual: layered in real 3D (portrait, terminal, beaver, badge
                sit at different depths and the stage tilts with the cursor) */}
            <div
              ref={visualRef}
              className="rv-stage lg:col-span-5 relative mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none pb-16 lg:pb-12"
            >
              <div ref={stageRef} className="rv-stage-inner relative">
                {/* Back plate: dashed drafting frame, offset behind the photo */}
                <div
                  ref={plateRef}
                  className="absolute top-5 right-[-14px] w-[78%] aspect-[4/5] lg:max-h-[52dvh] rounded-xl border border-dashed border-primary-500/35"
                />

                {/* Portrait */}
                <div
                  ref={photoRef}
                  className="rv-brackets relative ml-auto w-[78%] aspect-[4/5] lg:max-h-[52dvh] rounded-xl"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
                    <Image
                      src="/Assets/About/ramon_portrait.jpg"
                      alt="Portrait of Ramon"
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="(min-width: 1024px) 30vw, 75vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary-background-950/70 via-transparent to-transparent" />
                  </div>
                  <p className="absolute top-3 right-3 rounded-md border border-white/15 bg-primary-background-950/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-200">
                    Fig. 01 · Ramon
                  </p>
                </div>

                {/* Terminal card */}
                <div
                  ref={terminalRef}
                  className="panel absolute -bottom-14 right-[-6px] sm:right-[-14px] w-[66%] overflow-hidden bg-primary-background-900!"
                >
                  <div className="flex items-center gap-1.5 border-b border-white/10 bg-primary-background-950/60 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-secondary-500" />
                    <span className="h-2 w-2 rounded-full bg-slate-600" />
                    <span className="h-2 w-2 rounded-full bg-slate-600" />
                    <span className="ml-2 font-mono text-[9px] md:text-[10px] text-slate-500">
                      ramon@rvector: ~
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 px-3 py-3 font-mono text-[10px] md:text-[11px] leading-relaxed">
                    <p className="terminal-line text-slate-300">
                      <span className="text-primary-400">$</span> whoami
                    </p>
                    <p className="terminal-line text-slate-500">
                      software engineer @ ModalAI
                    </p>
                    <p className="terminal-line text-slate-300">
                      <span className="text-primary-400">$</span> cat stack.txt
                    </p>
                    <p className="terminal-line text-slate-500">
                      next.js · typescript · postgres · python
                    </p>
                    <p className="terminal-line text-slate-300">
                      <span className="text-primary-400">$</span> ./ship --host
                      rvector.dev
                    </p>
                    <p className="terminal-line text-emerald-400">
                      ✓ live
                      <span className="cursor-blink" />
                    </p>
                  </div>
                </div>

                {/* Beaver mascot */}
                <div
                  ref={beaverRef}
                  className="absolute -bottom-12 -left-4 sm:-left-10 lg:-left-14 w-[42%]"
                >
                  <Image
                    src={SiteData.logos.beaver}
                    alt="rvector beaver mascot coding on a laptop"
                    width={1024}
                    height={957}
                    priority
                    sizes="(min-width: 1024px) 18vw, 40vw"
                    className="w-full h-auto rv-float"
                  />
                </div>

                {/* Rotating badge */}
                <div
                  ref={badgeRef}
                  className="absolute -top-8 -left-2 sm:-left-6 w-[96px] h-[96px] md:w-[116px] md:h-[116px] rounded-full border border-white/10 bg-primary-background-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_26px_-10px_rgba(0,0,0,0.9)]"
                >
                  <svg
                    viewBox="0 0 120 120"
                    className="w-full h-full spin-slow"
                    aria-hidden="true"
                  >
                    <defs>
                      <path
                        id="badge-circle"
                        d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                      />
                    </defs>
                    <text className="fill-primary-300 font-mono text-[10px] uppercase tracking-[0.2em]">
                      <textPath href="#badge-circle">
                        rvector.dev · build · ship · host ·
                      </textPath>
                    </text>
                  </svg>
                  <span className="absolute inset-0 flex-center font-mono text-[18px] md:text-[20px] font-bold text-secondary-400">
                    &gt;_
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="hero-fade panel grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden bg-white/10!"
          >
            {HeroStats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1.5 bg-primary-background-950 px-4 py-4 md:px-6 md:py-5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]"
              >
                <p className="font-mono text-[10px] text-secondary-400">
                  0{i + 1}
                </p>
                <p className="font-funnel-sans text-white text-[28px] md:text-[36px] font-bold leading-none tracking-tight">
                  <span className="stat-value" data-value={stat.value}>
                    {stat.value}
                  </span>
                  <span className="text-primary-400">{stat.suffix}</span>
                </p>
                <p className="font-mono text-[9px] xs:text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="hidden md:flex justify-center">
            <div
              ref={scrollIndicatorRef}
              className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-400"
            >
              Begin
              <ArrowDownIcon className="w-3.5 h-3.5 text-primary-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------
          Tech marquee
      ------------------------------------------------------------------- */}
      <div className="w-full overflow-hidden border-y border-white/10 py-5 -mt-20 md:-mt-28">
        <div className="rv-marquee">
          {[0, 1].map((set) => (
            <div
              key={set}
              className="flex items-center shrink-0"
              aria-hidden={set === 1}
            >
              {marqueeItems.map((item) => (
                <span
                  key={`${set}-${item}`}
                  className="flex items-center gap-8 pr-8 font-funnel-sans text-[26px] md:text-[36px] font-bold text-outline whitespace-nowrap"
                >
                  {item}
                  <span className="text-secondary-500 text-[16px] [-webkit-text-stroke:0]">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------
          01 / Recent projects
      ------------------------------------------------------------------- */}
      <div className="flex flex-col gap-10 md:gap-14">
        <Reveal className="section-shell">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <SectionHeading
              index="01"
              label="Recent projects"
              title="A few things I've built recently."
              description="From the manufacturing platform I work on at ModalAI to client sites, research, and side projects."
            />
            <Link href="/projects" className="link-arrow group shrink-0 w-fit">
              All projects
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="section-shell flex flex-col gap-8 md:gap-10">
          {RecentProjects.map((project, index) => (
            <Suspense
              key={project.id}
              fallback={<RecentProjectCardSkeleton index={index} />}
            >
              <RecentProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            </Suspense>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------
          02 / Web design & hosting
      ------------------------------------------------------------------- */}
      <ServicesSection index="02" />

      {/* ------------------------------------------------------------------
          03 / Connect
      ------------------------------------------------------------------- */}
      <div className="flex flex-col gap-8">
        <Reveal className="section-shell">
          <SectionHeading
            index="03"
            label="Connect"
            title="Find me around the internet."
          />
        </Reveal>
        <div className="flex-center flex-row w-full overflow-hidden">
          <InfiniteScrollText
            text="Let's build something ✦"
            direction="left"
            className="font-funnel-sans text-[50px] md:text-[60px] lg:text-[72px] font-bold gradient-text whitespace-nowrap"
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <InfiniteScrollSocials direction="left" />
        </div>
      </div>
    </section>
  );
}
