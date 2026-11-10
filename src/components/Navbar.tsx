"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MenuIcon, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";
import { navbarLinks, socialIcons } from "@/constants/links_index";
import MobileMenu from "./MobileMenu";
import RvectorLogo from "./RvectorLogo";

// Base Navbar component (reusable for both static and floating)
const NavbarContent = ({
  onMenuToggle,
  isMenuOpen,
  isFloating = false,
  isCompact = false,
}: {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  isFloating?: boolean;
  isCompact?: boolean;
}) => {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div
      className={`flex justify-between items-center w-full px-5 md:px-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isFloating
          ? isCompact
            ? "h-12 rounded-xl border border-white/10 bg-primary-background-900/90 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_14px_30px_-12px_rgba(0,0,0,0.9)]"
            : "h-16 rounded-none border-b border-white/10 bg-primary-background-950/90 backdrop-blur-md shadow-[0_10px_24px_-14px_rgba(0,0,0,0.9)]"
          : "h-16 border-b border-white/10 bg-primary-background-950"
      }`}
    >
      <div className="flex items-center justify-between w-full h-full">
        <RvectorLogo />

        {/* Desktop: Nav links in center */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex-center flex-row gap-1">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`group relative font-mono text-[12px] uppercase tracking-[0.2em] py-2 px-4 transition-colors duration-300 ease-in-out cursor-pointer ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-4 right-4 -bottom-0.5 h-px origin-left bg-primary-400 transition-transform duration-300 ease-out ${
                    isActive(link.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop: Icon links + CTA on the right */}
        <div className="hidden lg:flex items-center gap-1">
          {navbarLinks.map((link) => {
            const icon =
              link.id === "github" || link.id === "linkedin"
                ? socialIcons[link.id]
                : socialIcons.pdf;
            if (!icon) return null;
            const isPdf = Boolean(link.download);
            return (
              <Link
                key={link.id}
                href={link.href}
                target={
                  link.download || link.id === "gmail" ? undefined : "_blank"
                }
                rel={
                  link.download || link.id === "gmail"
                    ? undefined
                    : "noopener noreferrer"
                }
                {...(link.download ? { download: true } : {})}
                className="flex items-center justify-center gap-1.5 h-9 px-2 rounded-full text-slate-400 hover:text-primary-300 hover:bg-white/5 active:text-primary-300 transition-colors duration-300"
                aria-label={link.ariaLabel}
                title={link.name}
              >
                <div className="w-5 h-5 pointer-events-none [&>svg]:w-5 [&>svg]:h-5">
                  {icon}
                </div>
                {isPdf && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] leading-none pointer-events-none">
                    {link.title}
                  </span>
                )}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="btn-primary ml-3 px-5! py-2! text-[13px]!"
          >
            Let&apos;s talk
          </Link>
        </div>

        {/* Mobile: Menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-all duration-300 ease-in-out"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <MenuIcon className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

// Static Navbar (default, always visible)
const StaticNavbar = ({
  onMenuToggle,
  isMenuOpen,
}: {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}) => {
  return (
    <div className="relative z-10 w-full shrink-0">
      <NavbarContent onMenuToggle={onMenuToggle} isMenuOpen={isMenuOpen} />
    </div>
  );
};

// Floating Navbar: slides in once the static navbar has scrolled away.
// Scrolling down, it doesn't disappear: it lifts and tightens into a compact
// bar. Scrolling up, it expands back to full size.
const FloatingNavbar = ({
  isVisible,
  isCompact,
  progressRef,
  onMenuToggle,
  isMenuOpen,
}: {
  isVisible: boolean;
  isCompact: boolean;
  progressRef: React.RefObject<HTMLDivElement | null>;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}) => {
  return (
    <div
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${isCompact ? "top-2 px-3 md:px-8 lg:px-16" : "top-0 px-0"}`}
    >
      <div className="relative">
        <NavbarContent
          onMenuToggle={onMenuToggle}
          isMenuOpen={isMenuOpen}
          isFloating
          isCompact={isCompact}
        />
        {/* Scroll progress */}
        <div
          className={`pointer-events-none absolute bottom-0 h-px overflow-hidden transition-all duration-500 ${
            isCompact ? "left-3 right-3" : "left-0 right-0"
          }`}
        >
          <div
            ref={progressRef}
            className="h-full w-full origin-left bg-linear-to-r from-primary-400 to-secondary-500"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
};

// Main Navbar component with scroll detection
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFloatingNavbar, setShowFloatingNavbar] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY || window.pageYOffset || 0;
    let ticking = false;

    const updateNavbar = () => {
      const currentScrollY = Math.max(
        0,
        window.scrollY || window.pageYOffset || 0
      );

      const navbarHeight = 64; // Height of the navbar (h-16)

      // Floating navbar takes over once the static one has scrolled away
      setShowFloatingNavbar(currentScrollY > navbarHeight);

      // Scrolling down tightens it into the compact bar, scrolling up
      // expands it again (small threshold so it doesn't flicker)
      if (currentScrollY > lastScrollY + 4 && currentScrollY > 160) {
        setIsCompact(true);
      } else if (currentScrollY < lastScrollY - 4 || currentScrollY <= 160) {
        setIsCompact(false);
      }

      // Scroll progress line (transform only, no re-render)
      if (progressRef.current) {
        const max =
          document.documentElement.scrollHeight - window.innerHeight || 1;
        progressRef.current.style.transform = `scaleX(${Math.min(1, currentScrollY / max)})`;
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when clicking outside (optional enhancement)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Mobile: Static navbar */}
      <StaticNavbar onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />

      {/* Mobile: Floating navbar */}
      <FloatingNavbar
        isVisible={showFloatingNavbar}
        isCompact={isCompact}
        progressRef={progressRef}
        onMenuToggle={toggleMenu}
        isMenuOpen={isMenuOpen}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navbarLinks={navbarLinks}
      />
    </>
  );
};

export default Navbar;
