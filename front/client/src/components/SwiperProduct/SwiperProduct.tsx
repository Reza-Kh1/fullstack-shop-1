"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import imag2 from "@/../public/laptop2.jpg";
import BoxProduct from "../BoxProduct/BoxProduct";
export default function SwiperProduct() {
  const data = [
    {
      price: 35000,
      name: "مانیتور",
      data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"],
      description:
        "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد",
      src: ["http://localhost:5000/public/images/1709299807383-images.jfif"],
      alt: "",
    },
    {
      price: 35000,
      name: "مانیتور",
      data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"],
      description:
        "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد",
      src: ["http://localhost:5000/public/images/1709299807383-images.jfif"],
      alt: "",
    },
    {
      price: 35000,
      name: "مانیتور",
      data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"],
      description:
        "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد",
      src: ["http://localhost:5000/public/images/1709299807383-images.jfif"],
      alt: "",
    },
    {
      price: 35000,
      name: "مانیتور",
      data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"],
      description:
        "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد",
      src: ["http://localhost:5000/public/images/1709299807383-images.jfif"],
      alt: "",
    },
    {
      price: 35000,
      name: "مانیتور",
      data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"],
      description:
        "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد",
      src: ["http://localhost:5000/public/images/1709299807383-images.jfif"],
      alt: "",
    },
    {
      price: 35000,
      name: "مانیتور",
      data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"],
      description:
        "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد",
      src: ["http://localhost:5000/public/images/1709299807383-images.jfif"],
      alt: "",
    },
    {
      price: 35000,
      name: "مانیتور",
      data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"],
      description:
        "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد",
      src: ["http://localhost:5000/public/images/1709299807383-images.jfif"],
      alt: "",
    },
    {
      price: 35000,
      name: "مانیتور",
      data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"],
      description:
        "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد",
      src: ["http://localhost:5000/public/images/1709299807383-images.jfif"],
      alt: "",
    },
    {
      price: 35000,
      name: "مانیتور",
      data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"],
      description:
        "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد",
      src: ["http://localhost:5000/public/images/1709299807383-images.jfif"],
      alt: "",
    },
    {
      price: 35000,
      name: "مانیتور",
      data: ["صفحه نمایش 15.6 اینچ", "سیستم عامل اندروید", "رنگ بندی متفاوت"],
      description:
        "لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235uدارد",
      src: ["http://localhost:5000/public/images/1709299807383-images.jfif"],
      alt: "",
    },
  ];
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
          <BoxProduct
            id={index}
            alt={i.alt}
            description={i.description}
            price={i.price}
            skill={i.data}
            src={i.src}
            subject={i.name}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
