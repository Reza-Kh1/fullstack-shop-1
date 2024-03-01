import React from "react";
import {
  FaCheck,
  FaFileInvoiceDollar,
  FaHeadset,
  FaShop,
} from "react-icons/fa6";
import { BsCalendar3 } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import Link from "next/link";
export default function BandPage() {
  const data = [
    { link: "/", name: "ارسال سریع", icon: <FaShippingFast /> },
    { link: "/", name: "خرید حضوری", icon: <FaShop /> },
    { link: "/", name: "مشاوره رایگان", icon: <FaHeadset /> },
    { link: "/", name: "فروش به صورت اقساطی", icon: <FaFileInvoiceDollar /> },
    { link: "/", name: "تضمین اصالت کالا", icon: <FaCheck /> },
    { link: "/", name: "7 روز ضمانت بازگشت", icon: <BsCalendar3 /> },
    { link: "/", name: "خرید آنلاین", icon: <MdPayment /> },
  ];
  return (
    <>
      {data.map((i, index) => (
        <Link key={index} href={i.link}>
          <div className="flex flex-col items-center gap-3 px-4 mx-3 py-2 shadow-md shadow-slate-300 dark:shadow-slate-300 rounded-md">
            <i className="text-3xl text-span-light dark:text-span-dark">
              {i.icon}
            </i>
            <span className="text-span-light dark:text-span-dark">
              {i.name}
            </span>
          </div>
        </Link>
      ))}
    </>
  );
}
