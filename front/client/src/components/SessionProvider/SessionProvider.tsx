"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export default function SessionProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
      <ToastContainer style={{ zIndex: 10000 }} autoClose={1400} />
    </SessionProvider>
  );
}
