import SidebarUser from "@/components/SidebarUser/SidebarUser";
import "./style.css"
import React from "react";
export default function layoutProfile({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <div className="bg-gray-200 w-2/12">
        <SidebarUser />
      </div>
      <div className="bg-gray-200 min-h-screen w-10/12 p-3">
        <div className="h-full p-3 bg-[#dadada] rounded-md shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
}
