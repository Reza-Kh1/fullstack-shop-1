"use client";
import { ProductPageType } from "@/app/type";
import ImageTag from "@/components/ImageTag/ImageTag";
import React from "react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export default function Sliderse({ data }: ProductPageType) {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={12}
        slidesPerView={5}
        navigation
        autoplay
        pagination={{ clickable: true }}
      >
        {data.detailProduct.srcImg.map((i, index) => (
          <SwiperSlide key={index}>
            <div key={index}>
              <ImageTag
                key={index}
                src={i}
                alt={data.altImg}
                height={300}
                width={300}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
