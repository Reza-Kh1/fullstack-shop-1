import Link from "next/link";
import React from "react";

export default function HeaderUser() {
  return (
    <div>
      <ul>
        <li>
          <Link href={"/"}>برگشتن به وب سایت</Link>
        </li>
        <li>
          <Link href={"/profile/cart"}>سبد خرید</Link>
        </li>
        <li>
          <Link href={"/"} replace={true}>
            خروج
          </Link>
        </li>
      </ul>
    </div>
  );
}
