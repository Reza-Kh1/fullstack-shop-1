import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaCartShopping,
  FaMoon,
} from "react-icons/fa6";
import "./style.css"
import icon from "@/../public/icon.jpg";
import { Button } from "@material-tailwind/react";
import { FaSearch, FaSun } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import ShareApp from "../ShareApp/ShareApp";
export default function Header() {
  const menuData = [
    {
      name: "موبایل",
      data: [
        {
          name: "گوشی موبایل",
          slug: "phone",
          data: [
            { name: "شیائومی", slug: "xiaomi" },
            { name: "آنر", slug: "honor" },
            { name: "آیفون", slug: "apple" },
            { name: "سامسونگ", slug: "samsung" },
          ],
        },
        {
          name: "قطعات موبایل",
          slug: "part-phone",
          data: [
            { name: "برد گوشی", slug: "bord-phone" },
            { name: "صفحه نمایش گوشی", slug: "lcd-phone" },
            { name: "سوکت شارژر گوشی", slug: "socet-phone" },
          ],
        },
        {
          name: "لوازم جانبی",
          slug: "side-phone",
          data: [
            { name: "قاب", slug: "cover-phone" },
            { name: "گلس", slug: "glass-phone" },
          ],
        },
      ],
    },
    {
      name: "لپتاپ",
      data: [
        {
          name: "لپتاپ",
          slug: "laptop",
          data: [
            { name: "ایسر", slug: "acer" },
            { name: "ایسوس", slug: "asus" },
            { name: "اچ پی", slug: "hp" },
            { name: "لنوو", slug: "lenovo" },
          ],
        },
        {
          name: "لوازم جانبی لپتاپ",
          slug: "laptop-part",
          data: [
            { name: "کیبرد", slug: "keybord" },
            { name: "کول پد", slug: "colpad" },
            { name: "اسپیکر", slug: "speacker" },
          ],
        },
        {
          name: "لپتاپ استوک",
          slug: "stock-laptop",
          data: [
            { name: "اچ پی", slug: "hp-stock" },
            { name: "دل", slug: "dell-stock" },
          ],
        },
      ],
    },
  ];
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
    <header className="pt-3 block mb-5 w-full px-3 max-width">
      <div className="mx-auto p-2 shadow-sm shadow-blue-gray-900 dark:shadow-blue-gray-200 dark:bg-gray-100 bg-blue-gray-900 rounded-md">
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
            <ShareApp />
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
                ثبت نام / ورود
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
        <div className="w-full mt-3">
          <ul className="flex justify-evenly relative text-gray-50 dark:text-gray-800 px-4 py-1 gap-2 w-full">
            {menuData.length &&
              menuData.map((item, index) => (
                <li key={index} className="menu-li-basic">
                  <span className="cursor-pointer group ">
                    {item.name}
                    <IoIosArrowUp
                      strokeWidth={2.5}
                      className={
                        "h-3.5 w-3.5 inline mr-2 transition-transform group-hover:rotate-180"
                      }
                    />
                  </span>
                  <ul className="menu-ul-basic bg-blue-gray-500">
                    {item.data.map((category, index) => (
                      <li key={index} className="menu-li-hover group/item">
                        <Link href={category.slug} className="text-gray-100 ">
                          {category.name}
                          {category.data.length && (
                            <IoIosArrowUp
                              strokeWidth={2.5}
                              className={
                                "h-3.5 w-3.5 inline mr-2 transition-transform group-hover/item:rotate-180"
                              }
                            />
                          )}
                        </Link>
                        <ul className="menu-ul-hover bg-blue-gray-800">
                          {category.data.map((i, index) => (
                            <li key={index}>
                              <Link
                                href={i.slug}
                                className="bg-blue-gray-700 hover:bg-blue-gray-500 text-gray-100"
                              >
                                {i.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </header>
  );
}