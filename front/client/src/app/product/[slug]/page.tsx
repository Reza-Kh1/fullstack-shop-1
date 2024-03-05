import { fetchApi } from "@/action/fetchApi";
import { ProductPageType } from "@/app/type";
import ImageTag from "@/components/ImageTag/ImageTag";
import { NextSeo, ProductJsonLd } from "next-seo";
import parse from "html-react-parser";
import React from "react";
import Sliderse from "./Sliderse";
type ProductComponent = {
  params: {
    slug: string;
  };
};

const getData = async (slug: string) => {
  const res = await fetchApi({ url: `product/${slug}`, next: 86000 });
  return res;
};
export default async function page({ params }: ProductComponent) {
  const { data }: ProductPageType = await getData(params.slug);
  return (
    <>
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
          <div
            className="bg-gray-700 p-5 my-5 rounded-lg shadow-md dark:bg-gray-50 text-span-light blog-product"
          >
            {parse(data?.detailProduct?.text)}
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <NextSeo
        title="عنوان صفحه شما"
        description="توضیحات صفحه شما"
        openGraph={{
          url: 'URL صفحه شما',
          title: 'عنوان Open Graph',
          description: 'توضیحات Open Graph',
          images: [
            {
              url: 'URL تصویر شما',
              width: 800,
              height: 600,
              alt: 'Alt تصویر',
            },
          ],
          site_name: 'نام سایت شما',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <ProductJsonLd
        productName={"phone"}
        images={["as"]}
        description={"des"}
        brand={"brand"}
        color='blue'
        aggregateRating={{
          ratingValue: 3.4,
          reviewCount: 150,
        }}
        offers={[
          {
            price: 34000,
            priceCurrency: 20000,
            priceValidUntil: '2025-12-31',
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/',
            seller: {
              name: 'reza',
            },
          },
        ]}
      /> */
}
// https://schema.org/UsedCondition استوک
// https://schema.org/NewCondition نو

// https://schema.org/OutOfStock موجود نیست
// https://schema.org/InStock موجود هست
