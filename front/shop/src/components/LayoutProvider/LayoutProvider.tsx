"use client";
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
export default function LayoutProvider({ children }: { children: any }) {
  const path = usePathname();
  return (
    <>
      <SessionProvider>
        <ThemeProvider>
          {!path.includes("/profile") && <Header />}
          {children}
          {!path.includes("/profile") && <Footer />}
          <ToastContainer style={{ zIndex: 10000 }} autoClose={1400} />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
