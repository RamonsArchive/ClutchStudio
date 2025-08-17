import React, { useState, useRef, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { createPortal } from "react-dom";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const outerMenuRef = useRef<HTMLDivElement>(null);
  const innerMenuRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP animations only once on component mount
  useGSAP(
    () => {
      // Set initial state - menu is hidden off-screen
      console.log("Setting initial state");
      gsap.set("#mobile-menu", {
        xPercent: 100,
        opacity: 0,
      });
    },
    { dependencies: [] }
  ); // Empty dependency array ensures this only runs once

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const outerTarget = outerMenuRef.current?.contains(event.target as Node);
      const innerTarget = innerMenuRef.current?.contains(event.target as Node);
      if (!outerTarget && !innerTarget && isOpen) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    gsap.to("#mobile-menu", {
      xPercent: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    // Optional: Animate menu icon out
    gsap.fromTo(
      "#menu-icon",
      {
        scale: 1,
        opacity: 1,
        xPercent: 0,
      },
      {
        xPercent: 100,
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      }
    );
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    gsap.to("#mobile-menu", {
      xPercent: 100,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    // Animate menu icon back in
    gsap.fromTo(
      "#menu-icon",
      {
        scale: 0.8,
        opacity: 0,
        xPercent: 100,
      },
      {
        scale: 1,
        opacity: 1,
        xPercent: 0,
        duration: 0.3,
        ease: "power2.out",
        delay: 0.1,
      }
    );
  }, []);

  console.log("MobileMenu rendered, isOpen:", isOpen);

  return (
    <>
      {/* Menu Icon - Always in DOM */}
      <div
        id="menu-icon"
        className="flex-center cursor-pointer p-2"
        ref={innerMenuRef}
        onClick={handleOpen}
      >
        <Menu className="w-6 h-6" color="white" />
      </div>
      {/* Portal Menu - Only when open */}
      {createPortal(
        <>
          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 w-[70%] max-w-sm bg-primary-background-500 z-50"
          >
            <div className="flex flex-col h-full">
              {/* Close Button */}
              <div className="flex justify-end p-5">
                <div
                  className="flex-center p-1 rounded-full bg-accent-300 cursor-pointer hover:bg-accent-400 transition-colors"
                  onClick={handleClose}
                >
                  <X className="w-5 h-5" color="white" />
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 items-center flex-col gap-8 px-5">
                <div className="flex flex-col gap-6 w-full">
                  {navLinks.map((link) => (
                    <Link
                      href={link.href}
                      key={link.name}
                      className="text-text-inverse text-[18px] font-medium py-3 px-4 rounded-lg duration-300 ease-in-out hover:bg-accent-300 transition-colors text-center"
                      onClick={handleClose}
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
