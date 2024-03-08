import { fetchApi } from "@/action/fetchApi";
import ImageTag from "@/components/ImageTag/ImageTag";
import ButtonCustom from "@/components/ui/ButtonCustom";
import Link from "next/link";
import React from "react";
type CategoryComponent = {
  params: { category: string };
};
type dataCategoryType = {
  name: string;
  slug: string;
  subCategories: {
    name: string;
    slug: string;
    altImg: string | null;
    srcImg: string;
  }[];
};
const getData = async (slug: string) => {
  const res = await fetchApi({ url: `category/${slug}`, next: 10 });
  return res.data;
};
export default async function page({ params }: CategoryComponent) {
  const data: dataCategoryType = await getData(params.category);
  return (
    <div className="w-full px-3 text-span-light dark:text-span-dark">
      <h2 className="text-h1-light dark:text-h1-dark bg-slate-600 dark:bg-gray-200 p-2 rounded-md ">
        دسته {data?.name}
      </h2>
      <div className="w-full mt-4 grid grid-cols-6 gap-2">
        {data?.subCategories.length &&
          data?.subCategories.map((i, index) => (
            <div key={index} className="p-1 rounded-md bg-gray-700">
              <Link href={"product/" + i.slug} title={i?.name}>
                <div className="w-full px-3">
                  <ImageTag
                    alt={i.altImg}
                    src={i.srcImg}
                    width={250}
                    height={400}
                    classPlus="w-full h-52 object-cover"
                  />
                </div>
              </Link>
              <div className="flex w-full flex-col items-center gap-2 justify-center my-2">
                <span className="text-span-light text-lg dark:text-span-dark">
                  {i?.name}
                </span>
                <Link href={"product/" + i.slug} title={i?.name}>
                  <ButtonCustom color="blue" className="text-xs">
                    مشاهده محصولات
                  </ButtonCustom>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
