import Image from "next/image";
import { Loader2 } from "lucide-react";
import { SiteData } from "@/constants";

const Loading = () => {
  return (
    <div
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-primary-background-950 px-6 py-12 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-0 rv-dot-grid opacity-60" />
      <div className="relative flex flex-col items-center justify-center gap-6">
        <Image
          src={SiteData.logos.beaver}
          alt={`${SiteData.name} logo`}
          width={1024}
          height={957}
          sizes="88px"
          className="w-[72px] sm:w-[88px] h-auto rv-float"
          priority
        />

        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-primary-background-900/70 px-4 py-2">
          <Loader2
            className="h-4 w-4 animate-spin text-primary-400"
            aria-hidden
          />
          <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-primary-300">
            {SiteData.domain}
          </span>
        </div>

        <p className="font-funnel-sans text-[14px] md:text-[15px] text-slate-400">
          Loading the page...
        </p>
      </div>
    </div>
  );
};

export default Loading;
