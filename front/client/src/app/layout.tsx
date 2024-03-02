import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SessionProviders from "@/components/SessionProvider/SessionProvider";
import Head from "next/head";
export const metadata: Metadata = {
  title: "فروشگاه اینترنتی من و تو",
  description:
    "فروش تمامیه لوازم و وسایل الکترونیک گوشی لپتاپ هارد اسپیکر و هر چیزی که برقی باشد",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <Head>
        
      </Head>
      <body>
        <div className="w-full min-h-screen bg-black dark:bg-slate-300">
          <SessionProviders>
            <Header />
            {children}
            <Footer />
          </SessionProviders>
        </div>
      </body>
    </html>
  );
}
