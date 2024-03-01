"use client";
import React from "react";
import ProfileUpdate from "@/components/ProfileUpdate/ProfileUpdate";
import AddressUser from "@/components/AddressUser/AddressUser";
export default function Page() {
  return (
    <div className="w-full mt-5">
      <div className="w-full p-2 rounded-md bg-bg-head-dark dark:bg-bg-head-light shadow-md mb-4">
        <span className="text-h1-light dark:text-h1-dark ">مشخصات کاربری</span>
      </div>
      <ProfileUpdate />
      <AddressUser />
    </div>
  );
}
