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
import {
  Button,
  Card,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { FaSearch, FaSun } from "react-icons/fa";
import { IoChevronDownCircleOutline } from "react-icons/io5";
export default function Header() {
  const [darkModes, setDarkMode] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>();
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
  const menuItems = [
    {
      title: "@material-tailwind/html",
      description:
        "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
    },
    {
      title: "@material-tailwind/react",
      description:
        "Learn how to use @material-tailwind/react, packed with rich components for React.",
    },
    {
      title: "Material Tailwind PRO",
      description:
        "A complete set of UI Elements for building faster websites in less time.",
    },
  ];
  return (
    <header className="pt-2">
      <div className="max-w-7xl w-10/12 mx-auto p-2 shadow-md shadow-blue-gray-900 dark:shadow-blue-gray-200 dark:bg-gray-100 bg-blue-gray-900 rounded-md">
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
            <span className="font-bold dark:text-gray-800 text-blue-gray-300">
              Mano To
            </span>
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
        <div className="flex  justify-between">
          <div className="flex gap-2">
            <Link href={"/auth"}>
              <Button
                variant="gradient"
                color="gray"
                className="font-medium"
                placeholder={"ورود و خروج"}
              >
                ثبت / ورود
              </Button>
            </Link>
            <Link href={"/profile"}>
              <Button
                variant="gradient"
                color="gray"
                className="font-medium"
                placeholder={"ورود و خروج"}
              >
                محصولات
                <FaCartShopping className="inline mr-2" />
              </Button>
            </Link>
          </div>
          <div className="search w-6/12">
            <label htmlFor="" className="relative">
              <input
                autoComplete="false"
                type="text"
                className="w-full h-full rounded-md p-2 shadow-md bg-gray-700 dark:bg-gray-400 text-gray-300 dark:text-gray-900 dark:placeholder:text-gray-700 placeholder:text-gray-100"
                placeholder="جستجو کنید..."
              />
              <i className="absolute left-0 cursor-pointer top-1/2 text-gray-100 dark:text-gray-700 transform translate-x-1/2 -translate-y-1/2">
                <FaSearch className="inline" />
              </i>
            </label>
          </div>
          <div className="">
            <Button
              onClick={darkModeBtn}
              placeholder={"darkmode"}
              variant="gradient"
              color={darkModes ? "blue-gray" : "deep-orange"}
            >
              {darkModes ? <FaMoon /> : <FaSun />}
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly mt-3">
          <Menu open={openMenu} handler={setOpenMenu} allowHover>
            <MenuHandler>
              <Button
                variant="text"
                className="flex items-center gap-3 text-base font-normal capitalize tracking-normal"
              >
                Technology{" "}
                <IoChevronDownCircleOutline
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    openMenu ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </MenuHandler>
            <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
              <Card
                color="gray"
                shadow={false}
                className="col-span-3 flex h-full w-full items-center justify-center rounded-2xl p-4"
              >
                <Typography className="mt-5 text-center" variant="h5">
                  Material Tailwind PRO
                </Typography>
              </Card>
              <ul className="col-span-4 flex w-full flex-col gap-1">
                {menuItems.map(({ title, description }) => (
                  <a href="#" key={title}>
                    <MenuItem>
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-1"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        {description}
                      </Typography>
                    </MenuItem>
                  </a>
                ))}
              </ul>
            </MenuList>
          </Menu>
          <span className="text-gray-100 dark:text-gray-800 cursor-pointer">
            لپتاپ
          </span>
          <span className="text-gray-100 dark:text-gray-800 cursor-pointer">
            گوشی
          </span>
          <span className="text-gray-100 dark:text-gray-800 cursor-pointer">
            قطعات کامپیوتر
          </span>
          <span className="text-gray-100 dark:text-gray-800 cursor-pointer">
            قطعات موبایل
          </span>
          <span className="text-gray-100 dark:text-gray-800 cursor-pointer">
            هارد
          </span>
        </div>
      </div>
    </header>
  );
}
