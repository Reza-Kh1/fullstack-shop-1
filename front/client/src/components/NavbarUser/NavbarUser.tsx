"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import DarkMode from "../DarkMode/DarkMode";
import { FaUser } from "react-icons/fa6";
export default function NavbarUser() {
  const { data }: any = useSession();
  const [time, setTime] = useState({ week: "", date: "" });
  const [role, setRole] = useState<"ADMIN" | "AUTHOR" | "USER">(
    data?.user?.body?.role || null
  );
  useEffect(() => {
    const date = new Date().toLocaleDateString("fa");
    const week = new Date().toLocaleDateString("fa", {
      weekday: "long",
    });
    setTime({ week, date });
  }, []);
  return (
    <div className="w-full p-2 rounded-md shadow-md flex justify-between items-center bg-custom-dark dark:bg-custom-light">
      <span className="text-span-light dark:text-span-dark">
        <FaUser className="inline text-span-light dark:text-span-dark ml-2" />
        {role && role === "AUTHOR"
          ? "نویسنده"
          : role === "ADMIN"
          ? "ادمین "
          : "کاربر"}
        {data?.user?.body?.name}
      </span>
      <div className="flex items-center justify-center text-span-light dark:text-span-dark">
        <span className="mx-2">({time.week})</span>
        <span>{time.date}</span>
      </div>
      <DarkMode />
    </div>
  );
}
