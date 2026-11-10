import React, { useRef } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createPortal } from "react-dom";
import SplitText from "gsap/SplitText";
import { navbarLinks, socialIcons } from "@/constants/links_index";
import RvectorLogo from "./RvectorLogo";

gsap.registerPlugin(SplitText);

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navbarLinks?: typeof navbarLinks;
}

const MobileMenu = ({
  isOpen,
  onClose,
  navbarLinks: links = navbarLinks,
}: MobileMenuProps) => {
  const [shouldRender, setShouldRender] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Animation when menu should appear
  useGSAP(() => {
    if (isOpen && shouldRender && menuRef.current) {
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
  }, [shouldRender, isOpen]); // Only run when shouldRender changes

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    const target = menuRef?.current?.contains(event.target as Node);
    if (!target && isOpen) {
      onClose();
    }
  };

  // Handle open/close state changes
  useGSAP(() => {
    if (isOpen) {
      // Opening the menu
      setShouldRender(true);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    } else if (shouldRender) {
      // Closing the menu (only if it was previously rendered)

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
  }, [isOpen, shouldRender]); // Run when isOpen changes

  return (
    <>
      {/* Portal Menu - Only render when shouldRender is true */}
      {shouldRender &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-primary-background-950/70 backdrop-blur-sm z-140"
              onClick={onClose}
            />

            {/* Mobile Menu */}
            <div
              id="mobile-menu"
              ref={menuRef}
              className="fixed inset-y-0 right-0 w-[82%] max-w-sm bg-primary-background-900 border-l border-white/10 rv-dot-grid z-150"
            >
              <div className="flex flex-col h-full">
                {/* Logo + Close Button */}
                <div className="flex items-center justify-between h-16 px-5 border-b border-white/10">
                  <RvectorLogo onClick={onClose} />
                  <button
                    className="flex-center w-10 h-10 rounded-full border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={onClose}
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" color="white" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 flex flex-col justify-center px-6">
                  <p className="eyebrow pb-4">Menu</p>
                  <div className="flex flex-col w-full">
                    {navLinks.map((link, index) => (
                      <Link
                        href={link.href}
                        key={link.name}
                        className="flex items-baseline gap-4 border-b border-white/10 py-3"
                        onClick={onClose}
                      >
                        <span className="font-mono text-[11px] text-secondary-400">
                          0{index + 1}
                        </span>
                        <span className="text-mobile-menu">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="btn-primary mt-8 w-full"
                  >
                    Let&apos;s talk
                  </Link>
                </div>

                {/* Icon Links */}
                <div className="flex flex-row gap-3 px-6 py-6 border-t border-white/10 flex-wrap">
                  {links.map((link) => {
                    const icon =
                      link.id === "github" || link.id === "linkedin"
                        ? socialIcons[link.id]
                        : socialIcons.pdf;
                    if (!icon) return null;
                    const isPdfLink =
                      link.id === "resume" || link.id === "research_paper1";
                    return (
                      <Link
                        key={link.id}
                        href={link.href}
                        target={
                          link.download || link.id === "gmail"
                            ? undefined
                            : "_blank"
                        }
                        rel={
                          link.download || link.id === "gmail"
                            ? undefined
                            : "noopener noreferrer"
                        }
                        {...(link.download ? { download: true } : {})}
                        className="flex items-center justify-center gap-1.5 h-10 px-3 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-primary-300 active:text-primary-300 transition-colors duration-300"
                        aria-label={link.ariaLabel}
                        title={link.name}
                        onClick={onClose}
                      >
                        <div className="w-5 h-5 pointer-events-none [&>svg]:w-5 [&>svg]:h-5">
                          {icon}
                        </div>
                        {isPdfLink && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] pointer-events-none">
                            {link.title}
                          </span>
                        )}
                      </Link>
                    );
                  })}
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
