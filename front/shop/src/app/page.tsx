import SwiperSlider from "@/components/SwiperSlider/SwiperSlider";
import imag1 from "@/../public/laptop1.jpg";
import imag2 from "@/../public/laptop2.jpg";
import imag3 from "@/../public/laptop3.jpg";
import imag4 from "@/../public/laptop4.jpg";
import ImageTag from "@/components/ImageTag/ImageTag";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCheck,
  FaFileInvoiceDollar,
  FaHeadset,
  FaShop,
  FaUsers,
} from "react-icons/fa6";
import { Button } from "@material-tailwind/react";
import { BsCalendar3 } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
export default function Home() {
  const image = [
    {
      src: "https://dkstatics-public.digikala.com/digikala-products/71bfb0ad549cb6f34301bae066fc7ebd24474749_1667911030.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
      alt: "",
    },
    { src: imag1, alt: "" },
    { src: imag2, alt: "" },
    { src: imag3, alt: "" },
    { src: imag4, alt: "" },
  ];
  return (
    <>
      <div className="w-full px-3 mx-auto max-width">
        <div className="h-[500px]">
          {/* <SwiperSlider images={image} /> */}
        </div>
        <div className="w-full flex py-2 gap-2">
          <div className="w-8/12 p-2 bg-custom-dark dark:bg-custom-light rounded-md flex flex-col justify-between">
            <span className="text-red-600 dark:text-red-300 text-lg">
              پیشنهاد ویژه امروز
            </span>
            <div className="mt-4 flex justify-between w-full">
              <div className="flex flex-col justify-between items-start">
                <div>
                  <span className="text-span-light dark:text-span-dark">
                    لپتاپ سری گیمینگ
                  </span>
                  <p className="text-p-light dark:text-p-dark">
                    مشخصات لپتاپ کارت گرافیک 4 گیگ rtx 3050 با رم 16 و حافظه 512
                    گیگ ssd
                  </p>
                </div>
                <Button variant="gradient" color="blue" className="font-medium">
                  <Link href={"/"}>
                    دیدن صفحه
                    <FaArrowLeft className="inline mr-2" />
                  </Link>
                </Button>
              </div>
              <figure>
                {/* <ImageTag src={imag1} width={200} alt="offer" height={150} /> */}
              </figure>
            </div>
          </div>
          <div className="w-4/12 p-2 bg-custom-dark dark:bg-custom-light rounded-md flex flex-col">
            <div className="bg-gradient-to-br to-blue-100 from-light-blue-800 p-3 rounded-md text-center mb-4">
              <span>خرید محصولات استوک</span>
            </div>
            <div className="bg-gradient-to-br to-blue-gray-500 from-blue-gray-700 p-3 rounded-md text-center">
              <h3 className="text-h1-light text-lg">معرفی کالاهای جدید</h3>
              <div className="w-1/2 mx-auto my-2">
                {/* <ImageTag alt="" src={imag3} width={150} height={150} /> */}
              </div>
              <Link href={"/"}>
                <Button
                  variant="gradient"
                  color="deep-purple"
                  className="w-1/3 font-medium"
                >
                  تماشا آنلاین
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="w-full my-2 justify-evenly bg-custom-dark dark:bg-custom-light">
          <div className="flex flex-col">
            <span>خرید مطمئن</span>
            <FaUsers className="inline" />
          </div>
          <div className="flex flex-col">
            <span>مشاوره رایگان</span>
            <FaHeadset className="inline" />
          </div>
          <div className="flex flex-col">
            <span>ارسال سریع</span>
            <FaShippingFast className="inline" />
          </div>
          <div className="flex flex-col">
            <span>خرید حضوری</span>
            <FaShop className="inline" />
          </div>
          <div className="flex flex-col">
            <span>فروش به صورت اقساطی</span>
            <FaFileInvoiceDollar className="inline" />
          </div>
          <div className="flex flex-col">
            <span>خرید آنلاین</span>
            <MdPayment className="inline" />
          </div>
          <div className="flex flex-col">
            <span>تضمین اصالت کالا</span>
            <FaCheck />
          </div>
          <div className="flex flex-col">
            <span>7 روز ضمانت بازگشت</span>
            <BsCalendar3 className="inline" />
          </div>
        </div> */}
      </div>
    </>
  );
}
