"use client";
import React, { useState } from 'react';
import { ProductPageType } from "@/app/type";
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImageTag from "@/components/ImageTag/ImageTag";
import "swiper/css";
import "swiper/css/scrollbar";
import 'swiper/css/effect-coverflow';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './style.css';
export default function Sliderse({ data }: { data: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isAutoplay, setIsAutoplay] = useState(true);
  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        autoplay={isAutoplay}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
        onMouseEnter={() => setIsAutoplay(false)}
        onMouseLeave={() => setIsAutoplay(true)}
      >
        {data?.map((i, index) => (
          <SwiperSlide key={index} className='rounded-md shadow-md'>
            <ImageTag
              key={index}
              src={i}
              alt={""}
              height={300}
              width={300}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={20}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {data?.map((i, index) => (
          <SwiperSlide key={index} className='rounded-md shadow-md cursor-pointer'>
            <ImageTag
              key={index}
              src={i}
              alt={""}
              height={300}
              width={300}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
