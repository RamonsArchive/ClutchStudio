"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useMobile from "./useMobile";
import MobileMenu from "./MobileMenu";
import { navLinks } from "@/constants";

const Navbar = () => {
  const [isDropDown, setIsDropDown] = useState(true);
  const { isMobile } = useMobile();

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Show when scrolling up or at top, hide when scrolling down
    if (currentScrollY > 42) {
      setIsDropDown(true);
    } else if (currentScrollY < 42) {
      setIsDropDown(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const renderContent = () => {
    return (
      <>
        <Link
          href="/"
          className="relative flex-center h-full w-[175px] cursor-pointer"
        >
          <Image
            src="./Logos/LightLogos/lightClutchLogoSVG.svg"
            alt="logo"
            fill
            className="object-cover object-top w-full h-full cursor-pointer"
          />
        </Link>
        {isMobile ? (
          <MobileMenu />
        ) : (
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
        )}
      </>
    );
  };

  return (
    <>
      {/* Background placeholder - always visible */}
      <div className="flex w-full h-[43px] bg-primary-background-900" />

      {/* Default navbar - NO ANIMATION when appearing */}
      <div
        className={`absolute top-0 left-0 right-0 flex w-full h-[43px] justify-between px-5 md:px-10 bg-primary-background-900 ${
          isDropDown
            ? "opacity-0 -translate-y-full transition-all duration-300 ease-in-out" // Animate when hiding
            : "opacity-100 translate-y-0" // No transition when showing
        }`}
      >
        {renderContent()}
      </div>

      {/* Dropdown navbar - ONLY ANIMATE when appearing */}
      <div
        className={`fixed top-0 left-0 right-0 z-100 flex w-full h-[43px] justify-between px-5 md:px-10 bg-primary-background-900 ${
          isDropDown
            ? "opacity-100 translate-y-0 transition-all duration-300 ease-in-out" // Animate when showing
            : "-translate-y-full opacity-0 transition-all duration-100 ease-in-out" // No transition when hiding
        }`}
      >
        {renderContent()}
      </div>
    </>
  );
};

export default Navbar;
