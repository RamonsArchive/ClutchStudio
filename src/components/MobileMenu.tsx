import React, { useRef } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createPortal } from "react-dom";
import SplitText from "gsap/SplitText";
import { navbarLinks, socialIcons } from "@/constants/links_index";

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
            <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

            {/* Mobile Menu */}
            <div
              id="mobile-menu"
              ref={menuRef}
              className="fixed inset-y-0 right-0 w-[70%] max-w-sm bg-linear-to-b from-primary-950 via-black to-accent-950 z-150"
            >
              <div className="flex flex-col h-full">
                {/* Close Button */}
                <div className="flex justify-end p-5">
                  <div
                    className="flex-center p-1 rounded-full bg-primary-background-950 cursor-pointer hover:bg-primary-background-400 transition-colors"
                    onClick={onClose}
                  >
                    <X className="w-5 h-5" color="white" />
                  </div>
                </div>

                {/* Icon Links - Before nav links */}
                <div className="flex flex-row gap-4 px-5 pb-6 justify-center">
                  {links.map((link) => {
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
                        className="flex items-center justify-center w-8 h-8 text-white opacity-70 hover:opacity-100 active:opacity-100 transition-opacity duration-300"
                        aria-label={link.ariaLabel}
                        title={link.title}
                        onClick={onClose}
                      >
                        <div className="w-8 h-8 text-white pointer-events-none">
                          {icon}
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Navigation Links */}
                <div className="flex-1 items-center flex-col gap-8">
                  <div className="flex flex-col gap-6 w-full px-5">
                    {navLinks.map((link) => (
                      <Link
                        href={link.href}
                        key={link.name}
                        className="text-mobile-menu"
                        onClick={onClose}
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
