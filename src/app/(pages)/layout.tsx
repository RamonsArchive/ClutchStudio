import Navbar from "@/components/Navbar";
import React from "react";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Toaster richColors />
      <Footer />
      <Analytics />
    </div>
  );
};

export default layout;
