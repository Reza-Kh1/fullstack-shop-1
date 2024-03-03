"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  FaBasketShopping,
  FaCartShopping,
  FaDoorClosed,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { FaHome, FaUser } from "react-icons/fa";
import { Button } from "../ui/button";
// import { Button } from "@material-tailwind/react";
type linkMenuType = {
  url: string;
  value: string;
  icon: React.ReactNode;
};
export default function SidebarUser() {
  const route = useRouter();
  const path = usePathname();
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      route.push("/");
    }
  });
  const LinkMenu = ({ url, value, icon }: linkMenuType) => {
    return (
      <Link href={url}>
        <Button
          className={`btn-user flex items-center text-sm ${
            url === path ? "active" : ""
          }`}
        >
          <i className="inline ml-2 mr-1">{icon}</i>
          {value}
        </Button>
      </Link>
    );
  };
  return (
    <div className="w-full side-bar sticky top-0">
      <div className="flex flex-col p-2 gap-2 w-full">
        <LinkMenu icon={<FaHome />} url="/" value="بازگشت به فروشگاه" />
        <LinkMenu icon={<FaUser />} url="/profile" value="پروفایل" />
        <LinkMenu
          icon={<FaCartShopping />}
          url="/profile/cart"
          value="سبد خرید"
        />
        <LinkMenu
          icon={<FaBasketShopping />}
          url="/profile/payment"
          value="محصولات خریداری شده"
        />
        <LinkMenu icon={<MdEmail />} url="/profile/support" value="پشتیبانی" />
        <Button
          className="btn-user text-right text-sm"
          color="green"
          onClick={() => {
            signOut({ redirect: false }), route.replace("/");
          }}
        >
          <FaDoorClosed className="inline ml-2 mr-2" />
          خروج
        </Button>
      </div>
    </div>
  );
}
