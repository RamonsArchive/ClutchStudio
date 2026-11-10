"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
      className={`contact-gradient-btn group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full cursor-pointer text-center w-fit max-w-full font-funnel-sans text-white text-[14px] md:text-[15px] font-semibold z-[50] invisible ${className ?? ""}`}
    >
      Let&apos;s Connect
      <ArrowRight
        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  );
};

export default ContactButton;
