import React, { useState, useRef, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createPortal } from "react-dom";
import { createSplitTextAnimation } from "@/lib/utils";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const outerMenuRef = useRef<HTMLDivElement>(null);
  const innerMenuRef = useRef<HTMLDivElement>(null);

  // Animation when menu should appear
  useGSAP(() => {
    if (isMenuOpen && shouldRender && menuRef.current) {
      const tl = gsap.timeline();

      // Set initial state
      tl.fromTo(
        "#mobile-menu",
        {
          xPercent: 100,
          opacity: 0,
        },
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );
      const splitTexts = SplitText.create(".text-mobile-menu", {
        type: "words",
      });

      tl.from(splitTexts.words, {
        opacity: 0,
        yPercent: -100,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
      });
    }
  }, [shouldRender]); // Only run when shouldRender changes

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    const target = menuRef?.current?.contains(event.target as Node);
    if (!target && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Handle open/close state changes
  useGSAP(() => {
    console.log("isMenuOpen changed to:", isMenuOpen);

    if (isMenuOpen) {
      // Opening the menu
      setShouldRender(true);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    } else if (shouldRender) {
      // Closing the menu (only if it was previously rendered)
      console.log("animating text out and menu out");

      const tl = gsap.timeline({
        onComplete: () => {
          setShouldRender(false);
        },
      });

      // Check if elements exist before animating
      const splitNavLinks = SplitText.create(".text-mobile-menu", {
        type: "words",
      });
      const menuElement = document.querySelector("#mobile-menu");

      if (splitNavLinks.words) {
        // Animate text out first
        tl.to(splitNavLinks.words, {
          opacity: 0,
          yPercent: -100,
          duration: 0.3,
          stagger: 0.08,
          ease: "power2.out",
        });
      }

      if (menuElement) {
        // Then animate menu out
        tl.to(
          "#mobile-menu",
          {
            xPercent: 100,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          "+=0.1"
        );
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]); // Run when isMenuOpen changes

  return (
    <>
      {/* Menu Icon - Always in DOM */}
      <div
        id="menu-icon"
        className="flex-center cursor-pointer p-2 z-50"
        ref={innerMenuRef}
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu className="w-6 h-6 cursor-pointer" color="white" />
      </div>

      {/* Portal Menu - Only render when shouldRender is true */}
      {shouldRender &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <div
              id="mobile-menu"
              ref={menuRef}
              className="fixed inset-y-0 right-0 w-[70%] max-w-sm bg-gradient-to-b from-primary-900 via-black to-accent-950 z-[150]"
            >
              <div className="flex flex-col h-full">
                {/* Close Button */}
                <div className="flex justify-end p-5 ">
                  <div
                    className="flex-center p-1 rounded-full bg-primary-background-900 cursor-pointer hover:bg-primary-background-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="w-5 h-5" color="white" />
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 items-center flex-col gap-8">
                  <div className="flex flex-col gap-6 w-full">
                    {navLinks.map((link) => (
                      <Link
                        href={link.href}
                        key={link.name}
                        className="text-mobile-menu"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
};

export default MobileMenu;
