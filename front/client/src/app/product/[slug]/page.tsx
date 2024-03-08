import { fetchApi } from "@/action/fetchApi";
import { ProductPageType } from "@/app/type";
import parse from "html-react-parser";
import React, { Suspense } from "react";
import Sliderse from "./Sliderse";
import { Metadata } from "next";
import Script from "next/script";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BandPage from "@/components/BandPage/BandPage";
import { FaStar } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { SlDislike, SlLike } from "react-icons/sl";
import { PiArrowBendUpLeft } from "react-icons/pi";
import Reviews from "@/components/Reviews/Reviews";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
type ProductComponent = {
  params: {
    slug: string;
  };
};
export async function getData(slug: string) {
  const res = await fetchApi({ url: `product/${slug}`, next: 10 });
  return res;
}
export async function generateMetadata({
  params,
}: ProductComponent): Promise<Metadata> {
  const { data }: ProductPageType = await getData(params.slug);
  return {
    title: data?.detailProduct?.title,
    description: data?.description,
    keywords: data?.detailProduct?.keyward,
    openGraph: {
      url: process.env.NEXTAUTH_URL + "/product/" + data?.slug,
      title: data?.name,
      description: data?.description,
      images: [
        {
          url: data?.detailProduct?.srcImg[0],
          width: 1200,
          height: 800,
          alt: data?.altImg,
        },
      ],
      siteName: process.env.NEXTAUTH_URL,
    },
  };
}
export default async function page({ params }: ProductComponent) {
  const { data }: ProductPageType = await getData(params.slug);
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data?.name,
    image: data?.detailProduct?.srcImg,
    description: data?.description,
    sku: data?.keycode,
    mpn: "کد ساخت",
    brand: {
      "@type": "Brand",
      name: data?.subCategory.name,
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "نام نویسنده نقد و بررسی",
        },
        description: "متن بررسی",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.4",
      reviewCount: "89",
    },
    offers: [
      {
        "@type": "Offer",
        url: process.env.NEXTAUTH_URL + "/product/" + data?.slug,
        priceCurrency: "IRR",
        price: data?.price,
        priceValidUntil: "تاریخ اعتبار تخفیف",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "نام فروشگاه",
        },
      },
    ],
  };
  const review = [
    {
      name: "علی رحیمی",
      date: "2014 / 05 / 04",
      text: "test 1",
      count: 4,
      id: 1,
      reply: [
        {
          name: "علی بگایی",
          date: "2014 / 05 / 04",
          text: "test 25",
          count: 4,
          id: 1,
          reply: [],
        },
        {
          name: "علی کسشعر",
          date: "2014 / 05 / 04",
          text: "test 2",
          count: 4,
          id: 1,
          reply: [
            {
              name: "سمیه",
              date: "2014 / 05 / 04",
              text: "test somaye",
              count: 4,
              id: 1,
              reply: [],
            },
          ],
        },
      ],
    },
  ];
  return (
    <>
      <Script
        type="application/ld+json"
        id="jsonld-product"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      <div className="w-full px-3 max-width">
        <div>
          <span className="text-span-light dark:text-span-dark">
            {data?.name}
          </span>
          {data?.detailProduct?.srcImg.length ? (
            <Sliderse data={data} />
          ) : (
            <span>هیچ عکسی ندارد</span>
          )}
          <div className="w-full my-3 flex justify-evenly bg-custom-dark dark:bg-custom-light p-3 py-5 rounded-md">
            <BandPage />
          </div>
          <Tabs dir="rtl" defaultValue="tab1" className="relative w-full mt-5">
            <TabsList className="w-full sticky top-0 bg-gray-900 dark:bg-gray-200 shadow-md flex justify-start gap-2">
              <TabsTrigger
                value="tab1"
                className="text-span-light dark:text-span-dark focus-visible:text-white"
              >
                توضیحات کامل
              </TabsTrigger>
              <TabsTrigger
                value="tab2"
                className="text-span-light dark:text-span-dark focus-visible:text-white"
              >
                مشخصات
              </TabsTrigger>
              <TabsTrigger
                value="tab3"
                className="text-span-light dark:text-span-dark focus-visible:text-white"
              >
                نظرات کاربران
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="bg-gray-700 p-5 my-5 rounded-lg shadow-md dark:bg-gray-50 text-span-light blog-product">
                {data?.detailProduct?.text
                  ? parse(data?.detailProduct?.text)
                  : null}
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="bg-custom-dark dark:bg-custom-light p-2 rounded-md">
                {data?.detailProduct?.skillProduct.map((item, index) => (
                  <div className="" key={index}>
                    <span className="text-span-light dark:text-span-dark font-bold text-lg mb-1 block">
                      {item?.name}
                    </span>
                    {item?.skills?.map((id, index2) => (
                      <div className="flex gap-2 my-2" key={index2}>
                        <span className="w-4/12 p-1 rounded-sm shadow-md bg-gray-800 dark:bg-slate-300 text-span-light dark:text-span-dark">
                          {id?.name}
                        </span>
                        <span className="w-8/12 p-1 rounded-sm shadow-md bg-gray-800 dark:bg-slate-300 text-span-light dark:text-span-dark">
                          {id?.text}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="tab3">
              <div className="bg-custom-dark dark:bg-custom-light p-2 rounded-md">
                <div>
                  <h4 className="text-span-light dark:text-span-dark text-lg mb-4">
                    54 نظر ثبت شده است
                  </h4>
                </div>
                {review.map((i, index) => (
                  <div
                    key={index}
                    className="shadow-md p-2 rounded-md border bg-gray-800 dark:bg-slate-200"
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-2 items-center">
                        <span className="text-span-light text-xs dark:text-span-dark">
                          ({i?.date})
                        </span>
                        <span className="text-span-light dark:text-span-dark">
                          {i?.name}
                        </span>
                        <span>
                          <FaStar className="text-yellow-400 inline" />
                          <FaStar className="text-yellow-400 inline" />
                          <FaStar className="text-yellow-400 inline" />
                          <FaStar className="text-yellow-400 inline" />
                          <FaStar className="text-yellow-400 inline" />
                        </span>
                      </div>
                      <div>
                        <button className="text-span-light dark:text-span-dark bg-gray-900 dark:bg-gray-50 shadow-md px-3 py-1 rounded-md">
                          پاسخ
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-span-light mt-2 dark:text-span-dark">
                        {i?.text}
                      </p>
                      <div className="w-1/12 mt-3">
                        <button
                          type="button"
                          className=" text-span-light w-full dark:text-span-dark bg-gray-900 dark:bg-gray-50 shadow-md px-3 py-1 text-center rounded-md"
                        >
                          نمایش پاسخ
                        </button>
                      </div>
                    </div>
                    <div className="response mt-2"></div>
                  </div>
                ))}
                {/* <Reviews data={review} /> */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
