import Navbar from "@/components/Navbar";
import React from "react";
import { Toaster } from "sonner";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Toaster richColors />
    </div>
  );
};

export default layout;
