"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ImageTag from "../ImageTag/ImageTag";
type SwiperSliderType = {
  images: {
    src: any;
    alt: string;
  }[];
};
export default function SwiperSlider({ images }: SwiperSliderType) {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="h-full"
    >
      {images.length &&
        images.map((i, index) => (
          <SwiperSlide key={index} className="h-full">
            <ImageTag
              width={450}
              height={450}
              alt={i.alt}
              src={i.src}
              className="w-full rounded-md shadow-md h-full object-cover"
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
