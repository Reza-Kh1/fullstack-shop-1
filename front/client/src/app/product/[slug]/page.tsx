import { fetchApi } from '@/action/fetchApi'
import { NextSeo, ProductJsonLd } from 'next-seo'
import React from 'react'
const getData = async (url: string) => {
  const res = await fetchApi({ url, next: 86000, })
  return res
}
export default async function page({ pathName }) {
  const data = await getData(pathName)
  return (
    <>
      <NextSeo
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
      />

      <div className='w-full'>
        <div>

        </div>

      </div>
    </>
  )
}
// https://schema.org/UsedCondition استوک
// https://schema.org/NewCondition نو

// https://schema.org/OutOfStock موجود نیست
// https://schema.org/InStock موجود هست