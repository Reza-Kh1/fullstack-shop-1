import Image from "next/image";
import Link from "next/link";
import React from "react";
import icon from "@/../public/icon.jpg";
import { FaSearch } from "react-icons/fa";
import ShareApp from "../ShareApp/ShareApp";
import BtnLogin from "./BtnLogin";
import DarkMode from "../DarkMode/DarkMode";
import "./style.css";
import { fetchApi } from "@/action/fetchApi";
import { IoIosArrowUp } from "react-icons/io";
type CategorysType = {
  id: number;
  name: string;
  categories: {
    slug: string;
    name: string;
    subCategories: {
      slug: string;
      name: string;
    }[];
  }[];
};
const getData = async () => {
  const res = await fetchApi({ url: "basic-category", next: 8600 });
  return res;
};
export default async function Header() {
  const allData: CategorysType[] = await getData();
  return (
    <header className="pt-3 mb-5 w-full px-3 mx-auto max-width">
      <div className="p-2 shadow-sm shadow-slate-300 bg-gray-600 dark:shadow-slate-300 dark:bg-gray-100 rounded-md">
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
            <span className="font-bold dark:text-gray-800 text-slate-300">
              Mano To
            </span>
          </div>
          <div>
            <span className="text-gray-300 dark:text-green-700">⟪ </span>
            <span className="text-gray-300 dark:text-green-700">
              با ما خرید مطمئن رو تجربه کنید
            </span>
            <span className="text-gray-300 dark:text-green-700"> ⟫</span>
          </div>
          <div className="share-icon flex gap-2">
            <ShareApp />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <BtnLogin />
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
            <DarkMode />
          </div>
        </div>
        <div className="w-full mt-3">
          <ul className="flex justify-evenly relative text-gray-100 dark:text-gray-800 px-4 py-1 gap-2 w-full">
            {allData.length &&
              allData?.map((item, index) => (
                <li key={index} className="menu-li-basic">
                  <span className="cursor-pointer group ">
                    {item?.name}
                    <IoIosArrowUp
                      strokeWidth={2.5}
                      className={
                        "h-3.5 w-3.5 inline mr-2 transition-transform group-hover:rotate-180"
                      }
                    />
                  </span>
                  <ul className="menu-ul-basic bg-gray-700 dark:bg-slate-500">
                    {item?.categories?.map((category, index) => (
                      <li key={index} className="menu-li-hover group/item">
                        <Link
                          href={`/category/${category.slug}`}
                          className="text-gray-100 "
                        >
                          {category.name}
                          {category.subCategories.length && (
                            <IoIosArrowUp
                              strokeWidth={2.5}
                              className={
                                "h-3.5 w-3.5 inline mr-2 transition-transform group-hover/item:rotate-180"
                              }
                            />
                          )}
                        </Link>
                        <ul className="menu-ul-hover bg-slate-800 dark:bg-slate-500">
                          {category.subCategories.map((i, index) => (
                            <li key={index}>
                              <Link
                                href={`/category/${category.slug}/sub-category/${i.slug}`}
                                className="dark:bg-slate-300 text-slate-900 bg-gray-400 hover:bg-slate-300-500 "
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
