"use client";
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@material-tailwind/react";
export default function LayoutProvider({ children }: { children: any }) {
  const path = usePathname();
  return (
    <>
      <ThemeProvider>
        {!path.includes("/profile") && <Header />}
        {children}
        {!path.includes("/profile") && <Footer />}
      </ThemeProvider>
    </>
  );
}
