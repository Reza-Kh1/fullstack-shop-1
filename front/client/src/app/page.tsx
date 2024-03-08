import imag1 from "@/../public/laptop1.jpg";
import imag2 from "@/../public/laptop2.jpg";
import imag3 from "@/../public/laptop3.jpg";
import imag4 from "@/../public/laptop4.jpg";
import ImageTag from "@/components/ImageTag/ImageTag";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import BandPage from "@/components/BandPage/BandPage";
import { Button } from "@/components/ui/button";
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
    <button className="text-gray-100">نمایش همه</button>
        <div className="h-[500px]">
        </div>
        <div className="w-full flex my-3 gap-2">
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
                {/* <ButtonTailwind color="blue">
                  <Link href={"/"}>
                    دیدن صفحه
                    <FaArrowLeft className="inline mr-2" />
                  </Link>
                </ButtonTailwind> */}
              </div>
              <figure>
                <ImageTag src={imag1} width={200} alt="offer" height={150} />
              </figure>
            </div>
          </div>
          <div className="w-4/12 p-2 bg-custom-dark dark:bg-custom-light rounded-md flex flex-col">
            <div className="bg-gradient-to-br to-blue-100 from-light-blue-800 p-3 rounded-md text-center mb-4">
              <span>خرید محصولات استوک</span>
            </div>
            <div className="bg-gradient-to-br to-bg-slate-300 from-bg-slate-300 p-3 rounded-md text-center">
              <h3 className="text-h1-light text-lg">معرفی کالاهای جدید</h3>
              <div className="w-1/2 mx-auto my-2">
                <ImageTag alt="" src={imag3} width={150} height={150} />
              </div>
              <Link href={"/"}>
                {/* <ButtonTailwind color="deep-purple" className="w-1/3">
                  تماشا آنلاین
                </ButtonTailwind> */}
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full my-3 flex justify-evenly bg-custom-dark dark:bg-custom-light p-3 py-5 rounded-md">
          <BandPage />
        </div>
        <div className="w-full my-3 p-3 bg-custom-dark dark:bg-custom-light rounded-md">
          <div className="mb-3 flex justify-between items-center">
            <span className="text-span-light dark:text-span-dark font-bold text-lg">
              محصولات آماده ارسال
            </span>
            <Link href={"/"}>
              {/* <ButtonTailwind color="light-green">نمایش همه</ButtonTailwind> */}
            </Link>
          </div>
        </div>
        <div className="w-full my-3 p-3 bg-custom-dark dark:bg-custom-light rounded-md">
          <div className="mb-3 flex justify-between items-center">
            <span className="text-span-light dark:text-span-dark font-bold text-lg">
              محصولات تخفیف خورده
            </span>
            <Link href={"/"}>
              {/* <ButtonTailwind color="indigo">نمایش همه</ButtonTailwind> */}
            </Link>
          </div>
        </div>
        <div className="w-full my-3 p-3 bg-custom-dark dark:bg-custom-light rounded-md">
          <div className="mb-3 flex justify-between items-center">
            <span className="text-span-light dark:text-span-dark font-bold text-lg">
              فروش امروز
            </span>

            <Link href={"/"}>-
              <Button>نمایش همه</Button>
              {/* <ButtonTailwind color="red"</ButtonTailwind> */}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
