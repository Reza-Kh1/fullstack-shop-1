"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button } from '@material-tailwind/react'
import { signOut, useSession } from 'next-auth/react'
import { FaCartShopping, FaShop } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { RiUserSettingsLine } from 'react-icons/ri'
import SubmitButton from '../Button/SubmitButton'
import { useParams, useRouter } from 'next/navigation'
import { FaHome } from 'react-icons/fa'

export default function SidebarUser() {
  const route = useRouter()
  const path = useParams()
  const { status, data } = useSession()
  useEffect(() => {
    if (status === "unauthenticated") {
      route.push("/")
    }
  })
  return (
    <div className='w-full side-bar'>
      {console.log(path)
      }
      <div className='flex flex-col p-2 gap-2 fixed w-2/12 mt-1'>
        <span className='rounded-md bg-light-blue-300 text-blue-gray-800 p-2'>
          <FaHome className='inline ml-2' />
          <Link href={"/"}>بازگشت به فروشگاه</Link>
        </span>
        <Link href={"setting"} className='btn-user'>پروفایل</Link>
        <Link href={"cart"} className='btn-user'>سبد خرید</Link>
        <Link href={"payment"} className='btn-user'>محصولات خریداری شده</Link>
        <Link href={"support"} className='btn-user'>پشتیبانی</Link>
        <SubmitButton value='خروج' color='green' onClick={() => { signOut({ redirect: false }), route.replace("/") }} />
      </div>
      <FaShop />
      <FaCartShopping />
      <MdEmail />
      <RiUserSettingsLine />
    </div>
  )
}