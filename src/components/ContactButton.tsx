"use client";
import React from "react";
import Link from "next/link";
import { useRef } from "react";

const ContactButton = ({
  ref,
}: {
  ref?: React.RefObject<HTMLAnchorElement>;
}) => {
  return (
    <Link
      href="/contact"
      id="contact-button"
      ref={ref}
      className="contact-gradient-btn px-6 py-3 rounded-lg cursor-pointer text-center w-full max-w-xl font-funnel-sans text-white text-[12px] xs:text-[16px] font-medium"
    >
      Contact Us
    </Link>
  );
};

export default ContactButton;
