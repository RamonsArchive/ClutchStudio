"use client";
import React from "react";
import Link from "next/link";

const ContactButton = ({
  ref,
  className,
}: {
  ref?: React.RefObject<HTMLAnchorElement>;
  className?: string;
}) => {
  return (
    <Link
      href="/contact"
      id="contact-button"
      ref={ref}
      className={`contact-gradient-btn px-4 py-2 rounded-lg cursor-pointer text-center w-full max-w-md font-funnel-sans text-white text-[12px] xs:text-[14px] font-medium z-[50] invisible ${className}`}
    >
      Let&apos;s Connect
    </Link>
  );
};

export default ContactButton;
