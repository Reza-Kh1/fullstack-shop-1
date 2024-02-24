import FooterUser from "@/components/FooterUser/FooterUser";
import HeaderUser from "@/components/HeaderUser/HeaderUser";
import React from "react";

export default function layoutProfile({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <HeaderUser />
      {children}
      <FooterUser />
    </>
  );
}
