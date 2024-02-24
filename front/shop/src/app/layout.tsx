import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import LayoutProvider from "@/components/LayoutProvider/LayoutProvider";

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی من و تو",
  description:
    "فروش تمامیه لوازم و وسایل الکترونیک گوشی لپتاپ هارد اسپیکر و هر چیزی که برقی باشد",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <div className="w-full min-h-screen bg-black dark:bg-blue-gray-300">
          <LayoutProvider>{children}</LayoutProvider>
        </div>
      </body>
    </html>
  );
}
