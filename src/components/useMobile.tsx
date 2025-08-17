"use client";
import React, { useEffect, useState, useCallback } from "react";

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = useCallback(() => {
    const newIsMobile = window.innerWidth < 768;
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
