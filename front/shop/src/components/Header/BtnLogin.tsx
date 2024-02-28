"use client"
import { Button } from '@material-tailwind/react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { FaCartShopping, FaUser } from 'react-icons/fa6'
export default function BtnLogin() {
    const { status, data } = useSession()
    return (
        <>
            {status === "authenticated" ? (
                <>
                    <Link href={"/profile/setting"}>
                        <Button
                            variant="gradient"
                            color="gray"
                            className="font-medium"
                        >
                            پروفایل
                            <FaUser className="inline mr-2" />
                        </Button>
                    </Link>
                    <Link href={"/profile/cart"}>
                        <Button
                            variant="gradient"
                            color="gray"
                            className="font-medium"
                        >
                            سبد خرید
                            <FaCartShopping className="inline mr-2" />
                        </Button>
                    </Link>
                </>
            ) : (
                <>
                    <Button
                        variant="gradient"
                        color="gray"
                        className="font-medium"
                        onClick={() => signIn()}
                    >
                        ثبت نام / ورود
                    </Button >
                    <Link href={"/"}>
                        <Button
                            variant="gradient"
                            color="gray"
                            className="font-medium"
                        >
                            محصولات
                            <FaCartShopping className="inline mr-2" />
                        </Button>
                    </Link>
                </>
            )
            }
        </>
    )
}
