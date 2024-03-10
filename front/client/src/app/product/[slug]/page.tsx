import { fetchApi } from "@/action/fetchApi";
import { ProductPageType } from "@/app/type";
import parse from "html-react-parser";
import React from "react";
import Sliderse from "./Sliderse";
import { Metadata } from "next";
import Script from "next/script";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BandPage from "@/components/BandPage/BandPage";
import { notFound } from "next/navigation";
type ProductComponent = {
  params: { slug: string };
};
const getData = async (slug: string) => {
  const res = await fetchApi({ url: `product/${slug}`, next: 10 });
  if (res?.error) {
    return notFound()
  }
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
  const allData: ProductPageType = await getData(params.slug);
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: allData?.data?.name,
    image: allData?.data?.detailProduct?.srcImg,
    description: allData.data?.description,
    sku: allData?.data?.keycode,
    mpn: "کد ساخت",
    brand: {
      "@type": "Brand",
      name: allData?.data?.subCategory.name,
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
        url: process.env.NEXTAUTH_URL + "/product/" + allData?.data?.slug,
        priceCurrency: "IRR",
        price: allData?.data?.price,
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
  return (
    <>
      <span>salam</span>
      <Script
        type="application/ld+json"
        id="jsonld-product"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      <div className="w-full px-3 max-width">
        <div>
          <span className="text-span-light dark:text-span-dark">
            {allData?.data?.name}
          </span>
          {allData?.data?.detailProduct?.srcImg.length ? (
            <div className="w-4/12">
              <Sliderse data={allData?.data?.detailProduct?.srcImg} />
            </div>
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
                {allData?.data?.detailProduct?.text
                  ? parse(allData?.data?.detailProduct?.text)
                  : null}
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="bg-custom-dark dark:bg-custom-light p-2 rounded-md">
                {allData?.data?.detailProduct?.skillProduct.map((item, index) => (
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
              </div >
            </TabsContent >
          </Tabs >
        </div >
      </div >
    </>
  );
}
