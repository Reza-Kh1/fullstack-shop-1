import type { Metadata } from "next";
import "./globals.css";
import LayoutProvider from "@/components/LayoutProvider/LayoutProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
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
      <body>
        <div className="w-full min-h-screen bg-black dark:bg-slate-300">
          <LayoutProvider>
            <Header />
            {children}
            <Footer />
          </LayoutProvider>
        </div>
      </body>
    </html>
  );
}
