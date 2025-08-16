"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import useMobile from "./useMobile";
const Navbar = () => {
  const [isFloating, setIsFloating] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const { isMobile } = useMobile();
  console.log("isMobile", isMobile);

  const handleScroll = () => {
    if (window.scrollY > 42) {
      setIsFloating(true);
    } else {
      setIsFloating(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const defaultNavbar = useMemo(() => {
    return (
      <div className="flex justify-between w-full h-[42px] px-5 md:px-10 bg-primary-background">
        <div className="relative flex-center h-full w-[175px]">
          <Image
            src="./Logos/LightLogos/lightClutchLogoSVG.svg"
            alt="logo"
            fill
            className="object-cover object-top w-full h-full"
          />
        </div>

        {isMobile ? (
          <Menu />
        ) : (
          <div className="flex-center flex-row gap-5 md:gap-10 text-white">
            <div className="flex-center cursor-pointer z-3">
              <Link
                href="/"
                className="text-white text-[14px] md:text-[16px] hover:text-gray-400 hover:underline hover:underline-offset-4 transition-all duration-300 ease-in-out !cursor-pointer z-2"
                style={{
                  cursor: "pointer",
                }}
              >
                Home
              </Link>
            </div>
            <div className="flex-center cursor-pointer z-3">
              <Link
                href="/"
                className="text-white text-[14px] md:text-[16px] hover:text-gray-400 hover:underline hover:underline-offset-4 transition-all duration-300 ease-in-out !cursor-pointer z-2"
                style={{
                  cursor: "pointer",
                }}
              >
                About
              </Link>
            </div>
            <div className="flex-center cursor-pointer z-3">
              <Link
                href="/"
                className="text-white text-[14px] md:text-[16px] hover:text-gray-400 hover:underline hover:underline-offset-4 transition-all duration-300 ease-in-out cursor-pointer z-2"
              >
                Projects
              </Link>
            </div>
            <div className="flex-center cursor-pointer z-3">
              <Link
                href="/"
                className="text-white text-[14px] md:text-[16px] hover:text-gray-400 hover:underline hover:underline-offset-4 transition-all duration-300 ease-in-out cursor-pointer z-2"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }, [isMobile]);
  return defaultNavbar;
};

export default Navbar;
