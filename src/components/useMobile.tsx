"use client";
import React, { useEffect, useState } from "react";

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    console.log(window.innerWidth);
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile };
};

export default useMobile;
