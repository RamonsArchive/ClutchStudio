import Navbar from "@/components/Navbar";
import React from "react";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Toaster richColors />
      <Footer />
    </div>
  );
};

export default layout;
