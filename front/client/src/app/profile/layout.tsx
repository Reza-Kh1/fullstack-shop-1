import SidebarUser from "@/components/SidebarUser/SidebarUser";
import "./style.css";
import React from "react";
import NavbarUser from "@/components/NavbarUser/NavbarUser";
export default function layoutProfile({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <div className="bg-gray-900 dark:bg-slate-300 w-2/12">
        <SidebarUser />
      </div>
      <div className="bg-gray-900 dark:bg-slate-300 min-h-screen w-10/12 p-3">
        <div className="h-full p-3  bg-[#393939] dark:bg-[#dadada] rounded-md shadow-md">
          <NavbarUser />
          {children}
        </div>
      </div>
    </div>
  );
}
