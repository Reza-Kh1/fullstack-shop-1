import React from "react";
import ImageTag from "../ImageTag/ImageTag";
import iconImage from "@/../public/icon.jpg";
import BandPage from "../BandPage/BandPage";
import ShareApp from "../ShareApp/ShareApp";
import { FaMessage, FaPhone } from "react-icons/fa6";
import Link from "next/link";
import ButtonTailwind from "../Button/ButtonTailwind";
import GetEmail from "./GetEmail";
export default function Footer() {
  const dataMenu = [
    {
      name: "فروشگاه من و تو",
      data: [
        { name: "قوانین و مقررات", src: "/" },
        { name: "مجوز و گواهینامه ها", src: "/" },
        { name: "گارانتی در فروشگاه ما", src: "/" },
        { name: "تماس با ما", src: "/" },
        { name: "درباره ما", src: "/" },
      ],
    },
    {
      name: "مطالب داغ",
      data: [
        { name: "لپتاپ گیمینگ", src: "/" },
        { name: "قیمت گوشی سامسونگ", src: "/" },
        { name: "لپتاپ های سرفیس", src: "/" },
        { name: "آیفون 13", src: "/" },
        { name: "گوشی شیائومی", src: "/" },
      ],
    },
    {
      name: "راهنما و خدمات",
      data: [
        { name: "مشاوره رایگان", src: "/" },
        { name: "پشتیبانی", src: "/" },
        { name: "پیگیری سفارش", src: "/" },
        { name: "نحوه ارسال کالا", src: "/" },
        { name: "تخفیف ها", src: "/" },
      ],
    },
  ];
  return (
    <>
      <div className="flex w-full justify-evenly">
        <div className="double-line w-full relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black dark:bg-blue-gray-100 px-3">
            <span className="text-span-light dark:text-span-dark">
              فروشگاه اینترنتی من و تو
            </span>
            <span className="px-1 text-span-light dark:text-span-dark">،</span>
            <span className="text-[#fea660] font-bold text-lg">
              خریدی ارزان و مطمئن
            </span>
          </div>
        </div>
      </div>
      <footer className="w-full py-5 px-3">
        <div className="w-full my-3 flex justify-evenly bg-custom-dark dark:bg-custom-light p-3 py-5 rounded-md">
          <BandPage />
        </div>
        <div className="footer flex gap-3">
          <div className="w-2/3">
            <div className="flex items-center gap-3">
              <div>
                <ImageTag
                  alt="فروشگاه اینترنتی من و تو"
                  height={150}
                  classPlus="w-14"
                  width={150}
                  src={iconImage}
                />
              </div>
              <span className="text-h1-light dark:text-h1-dark font-bold">
                فروشگاه اینترنتی من و تو
              </span>
            </div>
            <p className="mt-2 text-p-light dark:text-p-dark">
              .فروشگاه اینترنتی من و تو به صورت حضوری و آنلاین خدمات فروش وپس از
              فروش و پشتیبانی محصولات الکترونیکی را ارائه میدهد ما اینجا تمام
              تلاشمان را میکنیم که شما را به یک خرید راحت و مطمئن آشنا کنیم و
              میخوایم شما تجربه خوبی رو از خرید آنلاین با ما کسب کنید
            </p>
          </div>
          <div className="w-1/3 text-center">
            <span>مارا دنبال کنید</span>
            <div className="share-icon flex gap-2 mt-3 justify-center">
              <ShareApp />
            </div>
            <div className="mt-4">
              <p className="mb-3 text-h1-light dark:text-h1-dark">
                پاسخ گویی از ساعت 9 الی 21
              </p>
              <div className="flex gap-3 justify-center items-center">
                <Link
                  href={"tel:09390199977"}
                  className="p-2 px-3 text-span-light dark:text-span-dark rounded-md hover:bg-[#ffffff52]"
                >
                  09390199977
                  <FaPhone className="inline mr-2  text-span-light dark:text-span-dark" />
                </Link>
                <Link
                  href={"sms:09226115716"}
                  className="p-2 px-3 text-span-light dark:text-span-dark rounded-md hover:bg-[#ffffff52]"
                >
                  09226115716
                  <FaMessage className="inline mr-2 text-span-light dark:text-span-dark" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-3 items-center">
          <div className="w-8/12 flex gap-3 justify-evenly">
            {dataMenu.map((i, index) => (
              <div className="w-3/12" key={index}>
                <h3 className="mb-2 text-h1-light dark:text-h1-dark text-lg">
                  {i.name}
                </h3>
                <ul className="flex flex-col gap-2">
                  {i.data.map((name, indexs) => (
                    <li
                      key={indexs}
                      className="text-sm menu-footer relative text-p-light dark:text-p-dark hover:pr-3 transition-all"
                    >
                      <Link href={name.src}>{name.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="w-4/12 text-center">
            <span className="text-p-light dark:text-p-dark block mb-5">
              برای دریافت خبرنامه و تخفیف ها ایمیل خود را وارد کنید.
            </span>
            <GetEmail />
            <div className="flex justify-evenly mt-3">
              <ImageTag
                src={
                  "https://www.systemgroup.net/wp-content/uploads/2023/10/enamad-1024x669.jpg"
                }
                width={150}
                height={150}
                alt=""
              />
              <ImageTag
                src={
                  "https://roozrang.ir/wp-content/uploads/2024/01/zarrinpal.png"
                }
                width={150}
                height={150}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="p-3 mt-10 flex justify-center bg-[#2c2d2f] text-span-light dark:text-span-dark rounded-md dark:bg-[#e3eaf1]">
          <span>Copyright © 2007 - 2024 Man&To | All Rights Reserved</span>
        </div>
      </footer>
    </>
  );
}
