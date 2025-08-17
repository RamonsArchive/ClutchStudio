"use client";
import React, { useEffect, useState, useCallback } from "react";

const useMobile = () => {
  //const newIsMobile = window.matchMedia("(max-width: 768px)").matches;
  const [isMobile, setIsMobile] = useState(true);

  const handleResize = useCallback(() => {
    const newIsMobile = window.matchMedia("(max-width: 768px)").matches;
    console.log("Window width:", window.innerWidth, "isMobile:", newIsMobile);
    setIsMobile(newIsMobile);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return { isMobile };
};

export default useMobile;
