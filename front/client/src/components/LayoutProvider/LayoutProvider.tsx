"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { SessionProvider } from "next-auth/react";
export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children} </SessionProvider>;
}
