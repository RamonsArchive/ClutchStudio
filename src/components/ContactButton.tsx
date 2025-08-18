import React from "react";
import Link from "next/link";

const ContactButton = () => {
  return (
    <Link
      href="/contact"
      id="contact-button"
      className="contact-gradient-btn px-6 py-3 rounded-lg cursor-pointer text-center w-full max-w-xl font-funnel-sans text-white text-[12px] xs:text-[16px] font-regular"
    >
      Contact Us
    </Link>
  );
};

export default ContactButton;
