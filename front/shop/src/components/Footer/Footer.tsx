
import React from 'react'
import ImageTag from '../ImageTag/ImageTag'
import iconImage from "@/../public/icon.jpg"
import BandPage from '../BandPage/BandPage'
import ShareApp from '../ShareApp/ShareApp'
import { FaMessage, FaPhone } from 'react-icons/fa6'
export default function Footer() {

  return (
    <>
      <div className='flex w-full justify-evenly'>
        <div className='double-line w-full relative'>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black dark:bg-blue-gray-100 px-3'>
            <span>
              فروشگاه اینترنتی من و تو
            </span>
            <span className='px-1'>
              ،
            </span>
            <span className='text-red-400 font-bold text-lg'>
              خریدی ارزان و مطمئن
            </span>
          </div>
        </div>
      </div>
      <footer className='w-full py-5 px-3'>
        <div className="w-full my-3 flex justify-evenly bg-custom-dark dark:bg-custom-light p-3 py-5 rounded-md">
          <BandPage />
        </div>
        <div className='footer flex flex-wrap'>
          <div className='w-2/3 pl-2'>
            <div className='flex items-center gap-3'>
              <div>
                <ImageTag alt="فروشگاه اینترنتی من و تو" height={150} classPlus='w-14' width={150} src={iconImage} />
              </div>
              <span className='text-h1-light dark:text-h1-dark font-bold'>
                فروشگاه اینترنتی من و تو
              </span>
            </div>
            <p className='mt-2'>
              فروشگاه اینترنتی من و تو به صورت حضوری و آنلاین خدمات فروش وپس از فروش و پشتیبانی محصولات الکترونیکی را ارائه میدهم ما اینجا تمام تلاشمان را میکنیم که شما را به یک خرید مطمئن دعوت کنیم و میخوام شما تجربه خوبی رو از خرید آنلاین با ما کسب کنید
            </p>
          </div>
          <div className='w-1/3 pr-2 text-center'>
            <span>مارا دنبال کنید</span>
            <div className="share-icon flex gap-2 mt-3 justify-center">
              <ShareApp />
            </div>
            <div className='mt-4'>
              <p className='mb-3'>پاسخ گویی از ساعت 9 الی 21</p>
              <div className='flex gap-3 justify-center items-center'>
                <span className='p-2 px-3 text-span-light dark:text-span-dark rounded-md hover:bg-gray-400'>
                  09390199977
                  <FaPhone className='inline mr-2  text-span-light dark:text-span-dark' />
                </span>
                <span className='p-2 px-3 text-gray-900 dark:text-span-dark rounded-md dark:bg-green-200'>
                  09226115716
                  <FaMessage className='inline mr-2 text-span-light dark:text-span-dark' />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='p-3 mt-5 flex justify-center bg-[#2c2d2f] text-span-light dark:text-span-dark rounded-md dark:bg-[#e3eaf1]'>
          <span>
            Copyright © 2007 - 2024 Man&To | All Rights Reserved
          </span>
        </div>
      </footer>
    </>
  )
}
