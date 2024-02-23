import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaTelegram,
  FaInstagram,
  FaWhatsapp,
  FaCartShopping,
  FaMoon,
} from "react-icons/fa6";
import icon from "@/../public/icon.jpg";
import { Button } from "@material-tailwind/react";
import { FaSearch, FaSun } from "react-icons/fa";
export default function Header() {
  const [darkModes, setDarkMode] = useState<boolean>(false);
  const darkModeBtn = () => {    
    if (!darkModes) {
      setDarkMode(true);
      localStorage.setItem("darkMode", "enabled");
      document.body.classList.add("dark");
    } else {
      setDarkMode(false);
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "");
    }
  };
  useEffect(() => {
    let darkMode = localStorage.getItem("darkMode");
    if (darkMode) {
      document.body.classList.add("dark");
      setDarkMode(true);
    } else {
      document.body.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);
  return (
    <header className="pt-2">
      <div className="max-w-7xl w-10/12 mx-auto p-2 shadow-xl dark:bg-gray-100 bg-blue-gray-900 rounded-md">
        <div className="flex justify-between items-center border-b-gray-800 pb-2 mb-2 border-b">
          <div className="flex gap-2 items-center">
            <Link href={"/"}>
              <Image
                alt="فروشگاه من و تو"
                src={icon}
                width={45}
                height={45}
                className="rounded-md shadow-md"
              />
            </Link>
            <span className="font-bold">Mano To</span>
          </div>
          <div>
            <span className="text-gray-300 dark:text-light-green-700">⟪ </span>
            <span className="text-gray-300 dark:text-light-green-700">
              با ما خرید مطمئن رو تجربه کنید
            </span>
            <span className="text-gray-300 dark:text-light-green-700"> ⟫</span>
          </div>
          <div className="share-icon flex gap-2">
            <Link href={""}>
              <i className="py-1 px-2  rounded-md bg-blue-600 text-gray-50">
                <FaTelegram className="inline" />
              </i>
            </Link>
            <Link href={""}>
              <i className="py-1 px-2  rounded-md bg-instagram text-gray-50">
                <FaInstagram className="inline" />
              </i>
            </Link>
            <Link href={""}>
              <i className="py-1 px-2  rounded-md bg-green-600 text-gray-50">
                <FaWhatsapp className="inline" />
              </i>
            </Link>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="gradient"
              color="gray"
              className="font-medium"
              placeholder={"ورود و خروج"}
            >
              <Link href={"/auth"}>ثبت / ورود</Link>
            </Button>
            <Button
              variant="gradient"
              color="gray"
              className="font-medium"
              placeholder={"ورود و خروج"}
            >
              محصولات
              <FaCartShopping className="inline mr-2" />
            </Button>
          </div>
          <div className="search w-6/12">
            <label htmlFor="" className="relative">
              <input
                autoComplete="false"
                type="text"
                className="w-full h-full rounded-md p-2 shadow-md bg-gray-700 dark:bg-gray-400 text-gray-300 dark:text-gray-900"
                placeholder="جستجو کنید..."

              />
              <i className="absolute left-0 cursor-pointer top-1/2 text-gray-900 transform translate-x-1/2 -translate-y-1/2">
                <FaSearch className="inline" />
              </i>
            </label>
          </div>
          <div className="">
            <Button
              onClick={darkModeBtn}
              placeholder={"darkmode"}
              variant="gradient"
              color={darkModes ?  "blue-gray":"deep-orange"}
            >
              {darkModes ? <FaMoon /> : <FaSun />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
