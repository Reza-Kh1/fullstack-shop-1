import Link from "next/link";
import React from "react";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa6";
export default function ShareApp() {
  const data = [
    {
      href: "/",
      icon: <FaTelegram className="inline" />,
      class: "bg-blue-600",
    },
    {
      href: "/",
      icon: <FaInstagram className="inline" />,
      class: "bg-instagram",
    },
    {
      href: "/",
      icon: <FaWhatsapp className="inline" />,
      class: "bg-green-600",
    },
  ];
  return (
    <>
      {data.map((i, index) => (
        <Link href={i.href} key={index} title="icon site">
          <i className={`py-1 px-2 rounded-md text-gray-50 ${i.class}`}>
            {i.icon}
          </i>
        </Link>
      ))}
    </>
  );
}
