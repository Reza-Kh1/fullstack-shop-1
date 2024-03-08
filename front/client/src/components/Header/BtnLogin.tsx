"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import ButtonCustom from "../ui/ButtonCustom";
export default function BtnLogin() {
  const { status, data } = useSession();
  return (
    <>
      {status === "authenticated" ? (
        <>
          <Link href={"/profile"} title="profile">
            <ButtonCustom color="gray">
              پروفایل
              <FaUser className="inline mr-2" />
            </ButtonCustom>
          </Link>
          <Link href={"/profile/cart"} title="cart">
            <ButtonCustom color="gray">
              سبد خرید
              <FaCartShopping className="inline mr-2" />
            </ButtonCustom>
          </Link>
        </>
      ) : (
        <>
          <ButtonCustom color="gray" onClick={() => signIn()}>
            ثبت نام / ورود
          </ButtonCustom>
          <Link href={"/"} title="home">
            <ButtonCustom color="gray">
              محصولات
              <FaCartShopping className="inline mr-2" />
            </ButtonCustom>
          </Link>
        </>
      )}
    </>
  );
}
