import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import { Suspense } from "react";

export default function Admin() {
  return (
    <div className="flex">
      <div className="bg-gray-900 w-2/12">
        <SideBar />
      </div>
      <div className="bg-gray-900 min-h-screen w-10/12 p-3">
        <div className="h-full p-3 bg-[#dadada] rounded-md shadow-md">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                loading...
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
