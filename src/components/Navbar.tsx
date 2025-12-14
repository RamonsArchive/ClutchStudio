"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon, X } from "lucide-react";
import { navLinks } from "@/constants";
import { navbarLinks, socialIcons } from "@/constants/links_index";
import MobileMenu from "./MobileMenu";

// Base Navbar component (reusable for both static and floating)
const NavbarContent = ({
  onMenuToggle,
  isMenuOpen,
}: {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}) => {
  return (
    <div className="flex justify-between items-center w-full h-[43px] px-5 md:px-10 bg-primary-background-950">
      <div className="flex items-center justify-between w-full h-full">
        <Link
          href="/"
          className="relative flex-center h-full w-[175px] cursor-pointer"
        >
          <Image
            src="/Assets/Logos/LightLogos/lightLogoLightFistDesktop.svg"
            alt="logo"
            fill
            priority
            sizes="25vw"
            className="object-cover object-top w-full h-full cursor-pointer"
          />
        </Link>

        {/* Desktop: Nav links in center, icon links on right */}
        <div className="hidden lg:flex items-center justify-center flex-1 gap-0">
          <div className="flex-center flex-row text-white">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className="text-white text-[18px] font-medium py-2 px-5 md:px-10 duration-300 ease-in-out hover:bg-primary-background-400 transition-colors text-center z-100 cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop: Icon links on the right */}
        <div className="hidden lg:flex items-center gap-4">
          {navbarLinks.map((link) => {
            const icon =
              link.id === "github" || link.id === "linkedin"
                ? socialIcons[link.id]
                : socialIcons.pdf;
            if (!icon) return null;
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
                className="flex items-center justify-center w-6 h-6 text-white opacity-70 hover:opacity-100 active:opacity-100 transition-opacity duration-300"
                aria-label={link.ariaLabel}
                title={link.title}
              >
                <div className="w-6 h-6 text-white">{icon}</div>
              </Link>
            );
          })}
        </div>

        {/* Mobile: Menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MenuIcon className="w-6 h-6 text-white" />
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
    <div className="lg:hidden relative z-10 w-full shrink-0">
      <NavbarContent onMenuToggle={onMenuToggle} isMenuOpen={isMenuOpen} />
    </div>
  );
};

// Floating Navbar (appears when scrolling down past static navbar)
const FloatingNavbar = ({
  isVisible,
  onMenuToggle,
  isMenuOpen,
}: {
  isVisible: boolean;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}) => {
  return (
    <div
      className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <NavbarContent onMenuToggle={onMenuToggle} isMenuOpen={isMenuOpen} />
    </div>
  );
};

// Main Navbar component with scroll detection
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFloatingNavbar, setShowFloatingNavbar] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    // Initialize scroll position to handle Instagram's browser quirks
    let lastScrollY = 0;
    let ticking = false;
    let hasScrolled = false;
    let initialized = false;

    // Force scroll to top on mount to fix Instagram's initial scroll position
    const forceScrollToTop = () => {
      if (window.scrollY > 0 || window.pageYOffset > 0) {
        window.scrollTo(0, 0);
      }
      lastScrollY = 0;
      setShowFloatingNavbar(false);
      initialized = true;
    };

    // Initialize immediately and after delays to catch Instagram's delayed scroll
    forceScrollToTop();
    const initTimeout1 = setTimeout(forceScrollToTop, 50);
    const initTimeout2 = setTimeout(forceScrollToTop, 200);

    const updateNavbar = () => {
      console.log("updateNavbar");
      if (!initialized) return;

      console.log("initialized");

      const currentScrollY = Math.max(
        0,
        window.scrollY || window.pageYOffset || 0
      );

      console.log("currentScrollY", currentScrollY);

      const navbarHeight = 43; // Height of the navbar

      // Detect if user has actually scrolled (not just initial load quirk)
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      if (scrollDelta > 2) {
        hasScrolled = true;
      }

      // Only show floating navbar when we've actually scrolled and are past navbar
      if (hasScrolled && currentScrollY > navbarHeight) {
        // Scrolling down
        if (currentScrollY > lastScrollY) {
          setShowFloatingNavbar(true);
        }
        // Scrolling up - hide floating navbar
        else if (currentScrollY < lastScrollY) {
          setShowFloatingNavbar(false);
        }
      } else {
        // At top or haven't scrolled yet, hide floating navbar
        setShowFloatingNavbar(false);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      console.log("scorlling");
      if (!ticking && initialized) {
        console.log("ticking");
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(initTimeout1);
      clearTimeout(initTimeout2);
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
      {/* Background placeholder - always visible */}
      <div className="flex w-full h-[43px] bg-primary-background-950" />

      {/* Desktop: Always visible navbar */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 w-full h-[43px] z-10">
        <NavbarContent onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
      </div>

      {/* Mobile: Static navbar */}
      <StaticNavbar onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />

      {/* Mobile: Floating navbar */}
      <FloatingNavbar
        isVisible={showFloatingNavbar}
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
