"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import imag2 from "@/../public/laptop2.jpg";
import ImageTag from "../ImageTag/ImageTag";
export default function SwiperProduct() {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={20}
      slidesPerView={5}
      navigation
      autoplay
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <div className="p-3 box-product  bg-blue-gray-200 rounded-md overflow-hidden">
          <ImageTag
            src={imag2}
            alt="as"
            classPlus="w-72 object-cover"
            height={120}
            width={120}
          />
          <div>
            <span>صفحه نمایش</span>
            <p>
              لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235u
              دارد
            </p>
            <span>135000 تومان</span>
          </div>
          <span className="bottom-hover flex justify-center items-center text-gray-400">
            13500 تومان
          </span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="p-3 bg-blue-gray-200 rounded-md ">
          <div className="w-5/6 mx-auto">
            <ImageTag src={imag2} alt="as" height={120} width={120} />
          </div>
          <div>
            <span>صفحه نمایش</span>
            <p>
              لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235u
              دارد
            </p>
            <span>135000 تومان</span>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="p-3 bg-blue-gray-200 rounded-md ">
          <div className="w-5/6 mx-auto">
            <ImageTag src={imag2} alt="as" height={120} width={120} />
          </div>
          <div>
            <span>صفحه نمایش</span>
            <p>
              لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235u
              دارد
            </p>
            <span>135000 تومان</span>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="p-3 bg-blue-gray-200 rounded-md h-86">
          <div className="w-5/6 mx-auto">
            <ImageTag src={imag2} alt="as" height={120} width={120} />
          </div>
          <div>
            <span>صفحه نمایش</span>
            <p>
              لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235u
              دارد
            </p>
            <span>135000 تومان</span>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="h-full">
        <div className="p-3 bg-blue-gray-200 rounded-md ">
          <div className="w-5/6 mx-auto">
            <ImageTag src={imag2} alt="as" height={120} width={120} />
          </div>
          <div>
            <span>صفحه نمایش</span>
            <p>
              لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235u
              دارد
            </p>
            <span>135000 تومان</span>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="h-full">
        <div className="p-3 bg-blue-gray-200 rounded-md ">
          <div className="w-5/6 mx-auto">
            <ImageTag src={imag2} alt="as" height={120} width={120} />
          </div>
          <div>
            <span>صفحه نمایش</span>
            <p>
              لپتاپ اچ پی 15.6 اینچی مدل victus رم 16 پردازنده core i5-1235u
              دارد
            </p>
            <span>135000 تومان</span>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
