"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import imag2 from "@/../public/laptop2.jpg";
import ImageTag from "../ImageTag/ImageTag";
import { FaAngleLeft, FaArrowRight, FaMinus, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import Link from "next/link";
export default function SwiperProduct() {
  const [changeBtn, setChangeBtn] = useState<number | null>(null)
  const data = [
    {
      price: 35000, name: "مانیتور", data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"], description: "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد", src: imag2, alt: ""
    },
    {
      price: 35000, name: "مانیتور", data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"], description: "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد", src: imag2, alt: ""
    },
    {
      price: 35000, name: "مانیتور", data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"], description: "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد", src: imag2, alt: ""
    },
    {
      price: 35000, name: "مانیتور", data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"], description: "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد", src: imag2, alt: ""
    },
    {
      price: 35000, name: "مانیتور", data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"], description: "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد", src: imag2, alt: ""
    },
    {
      price: 35000, name: "مانیتور", data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"], description: "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد", src: imag2, alt: ""
    }, {
      price: 35000, name: "مانیتور", data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"], description: "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد", src: imag2, alt: ""
    }, {
      price: 35000, name: "مانیتور", data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"], description: "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد", src: imag2, alt: ""
    }, {
      price: 35000, name: "مانیتور", data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"], description: "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد", src: imag2, alt: ""
    }, {
      price: 35000, name: "مانیتور", data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"], description: "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد", src: imag2, alt: ""
    }
  ]
  const changeButton = (index: number) => {
    if (changeBtn === index) {
      setChangeBtn(null)
    } else {
      setChangeBtn(index)
    }
  }
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={12}
      slidesPerView={5}
      navigation
      autoplay
      pagination={{ clickable: true }}
    >
      {data.map((i, index) => (
        <SwiperSlide key={index}>
          <div className="p-3 box-product  bg-blue-gray-200 rounded-md overflow-hidden">
            <ImageTag
              src={imag2}
              alt="as"
              classPlus="w-72"
              height={120}
              width={120}
            />
            <div className="pb-10">
              <span className="text-lg text-span-dark dark:text-span-light">{i.name}</span>
              <p className="text-sm">
                {i.description}
              </p>
              <span className="mt-2">قیمت : {(i.price).toLocaleString("fa")} تومان</span>
            </div>
            <div className={`flex flex-col justify-between bottom-down ${changeBtn === index ? "bottom-up" : null}`}>
              <div>
                <div className="w-full text-center inline-block mt-3 cursor-pointer" onClick={() => changeButton(index)}>
                  {
                    changeBtn === index ? (
                      <>
                        <span className="btn-box-product">
                          بستن
                          <FaMinus className="inline mr-2" />
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="btn-box-product">
                          نمایش بیشتر
                          <FaPlus className="inline mr-2" />
                        </span>
                      </>
                    )
                  }
                </div>
                <ul className="flex flex-col gap-2 mt-7 px-3">
                  {i.data.map((i, indexs) => (
                    <li key={indexs}><i><FaAngleLeft className="ml-2 inline" /></i>{i}</li>
                  ))}
                </ul>
              </div>
              <Link href={"/"} className="w-11/12 py-2 mb-6 mx-auto text-center rounded-md bg-blue-100 hover:bg-blue-400 hover:text-gray-50 shadow-md">
                صفحه محصول
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}

    </Swiper>
  );
}
