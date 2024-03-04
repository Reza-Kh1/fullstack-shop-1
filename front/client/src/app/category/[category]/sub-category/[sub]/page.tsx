import { fetchApi } from "@/action/fetchApi";
import { BoxProductType } from "@/app/type";
import BoxProduct from "@/components/BoxProduct/BoxProduct";
import React from "react";
type CategoryComponent = {
  params: { sub: string; category: string };
};
type SubCategoryType = {
  name: string;
  slug: string;
  category: {
    name: string;
    slug: string;
  };
  products: BoxProductType[];
};
const getData = async (slug: string) => {
  const res = await fetchApi({ url: `sub-category/${slug}`, next: 30 });
  return res.data;
};
export default async function page({ params }: CategoryComponent) {
  const data: SubCategoryType = await getData(params.sub);
  return (
    <div className="w-full max-width px-3">
      <h2 className="text-h1-light dark:text-h1-dark bg-slate-600 dark:bg-gray-200 p-2 rounded-md ">
        دسته {data?.name}
      </h2>
      <div className="w-full mt-4 grid grid-cols-6 gap-2">
        {data?.products.length ? (
          data.products.map((i) => (
            <BoxProduct
              key={i.id}
              src={i.srcImg}
              description={i.description}
              id={i.id}
              alt={i.altImg}
              price={i.price}
              subject={i.name}
              slug={i.slug}
            />
          ))
        ) : (
          <div className="w-full flex justify-center">
            <span className="text-span-light dark:text-span-dark">
              هیچ محصولی برای نمایش یافت نشد
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
