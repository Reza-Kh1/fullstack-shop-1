import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function ImageSlider({ images }: { images: string[] }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {images &&
        images.map((url: string) => (
          <SwiperSlide key={url}>
            <figure>
              <img
                className="h-40 shadow-md rounded-md"
                width="100%"
                src={url}
                alt="alt"
              />
            </figure>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
