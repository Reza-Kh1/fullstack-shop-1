"use client";
import { fetchApi } from "@/action/fetchApi";
// import { Button } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
export default function ProfileUpdate() {
  const [open, setOpen] = useState<boolean>(false);
  const { data }: { data: any } = useSession();
  const UpdateUser = async (form: FormData) => {
    const name = form.get("name") as string | null;
    const password = form.get("password") as string | null;
    let body: { name?: string; password?: string } = {};
    if (name) {
      body.name = name;
    }
    if (password) {
      body.password = password;
    }
    const token = data?.user?.token;
    if (token) {
      const res = await fetchApi({
        url: "user/123",
        body,
        method: "PUT",
        token,
      });
      if (res.data) {
        toast.success("با موفقیت اطلاعات آپدیت شد");
      }
    }
  };
  return (
    <div className="w-8/12 p-4 mx-auto bg-custom-dark dark:bg-custom-light shadow-md rounded-md">
      <div>
        {open ? (
          <form
            className="flex items-center justify-center flex-wrap"
            action={UpdateUser}
          >
            <div className="w-full items-center">
              <span className="text-gray-100 text-lg">ویرایش اطلاعات</span>
            </div>
            <div className="w-5/12 p-2">
              <span className="text-span-light dark:text-span-dark">
                تغییر نام :
              </span>
              <input
                name="name"
                type="text"
                className="p-3 block w-full mt-2 rounded-md bg-gray-700 text-gray-100 shadow-md"
                defaultValue={data?.user?.body.name}
              />
            </div>
            <div className="w-5/12 p-2">
              <span className="text-span-light dark:text-span-dark">
                تغییر پسورد :
              </span>
              <input
                name="password"
                type="text"
                className="p-3 block w-full mt-2 rounded-md bg-gray-700 text-gray-100 shadow-md"
              />
            </div>
            <div className="flex mt-4 w-full justify-between">
              {/* <Button
                variant="gradient"
                color="green"
                type="submit"
                className="px-12"
              >
                ثبت
              </Button>
              <Button
                variant="gradient"
                color="red"
                className="px-12"
                onClick={() => setOpen((prev) => !prev)}
              >
                انصراف
              </Button> */}
            </div>
          </form>
        ) : (
          <>
            <div className="flex flex-wrap">
              <div className="w-6/12 p-2 mt-2">
                <span className="block text-gray-50">نام کاربری :</span>
                <span className="px-3 mt-1 block py-1 rounded-md bg-gray-300">
                  {data?.user?.body.name || "ثبت نشده"}
                </span>
              </div>
              <div className="w-6/12 p-2 mt-2">
                <span className="block text-gray-50">ایمیل :</span>
                <span className="px-3 mt-1 block py-1 rounded-md bg-gray-300">
                  {data?.user?.body?.email || "ثبت نشده"}
                </span>
              </div>
              <div className="w-6/12 p-2 mt-2">
                <span className="block text-gray-50">شماره تلفن :</span>
                <span className="px-3 mt-1 block py-1 rounded-md bg-gray-300">
                  {data?.user?.body?.phone || "ثبت نشده"}
                </span>
              </div>
              <div className="w-6/12 p-2 mt-2">
                <span className="block text-gray-50">موقعیت کاربری :</span>
                <span className="px-3 mt-1 block py-1 rounded-md bg-gray-300">
                  {data?.user?.body?.role || "کاربر"}
                </span>
              </div>
            </div>
            <div className="text-right w-full mt-4">
              {/* <Button
                variant="gradient"
                color="deep-orange"
                className="px-12"
                onClick={() => setOpen((prev) => !prev)}
              >
                ویرایش
              </Button> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
