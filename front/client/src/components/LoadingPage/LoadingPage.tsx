"use client";
import Image from "next/image";
import React from "react";
import Loading from "@/../public/loading.svg";
export default function LoadingPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image src={Loading} alt="" width={300} height={300} />
    </div>
  );
}
