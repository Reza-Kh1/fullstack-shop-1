import { fetchApi } from "@/action/fetchApi";
import Link from "next/link";
import React from "react";
import { IoIosArrowUp } from "react-icons/io";
type CategorysType = {
  id: number;
  name: string;
  categories: {
    slug: string;
    name: string;
    subCategories: {
      slug: string;
      name: string;
    }[];
  }[];
};
const getData = async () => {
  const res = await fetchApi({ url: "basic-category", next: 8600 });
  return res;
};
export default async function Categorys() {
  const allData: CategorysType[] = await getData();
  return (
    <>
      <div className="w-full mt-3">
        <ul className="flex justify-evenly relative text-gray-50 dark:text-gray-800 px-4 py-1 gap-2 w-full">
          {allData.length &&
            allData?.map((item, index) => (
              <li key={index} className="menu-li-basic">
                <span className="cursor-pointer group ">
                  {item?.name}
                  <IoIosArrowUp
                    strokeWidth={2.5}
                    className={
                      "h-3.5 w-3.5 inline mr-2 transition-transform group-hover:rotate-180"
                    }
                  />
                </span>
                <ul className="menu-ul-basic bg-slate-300">
                  {item?.categories?.map((category, index) => (
                    <li key={index} className="menu-li-hover group/item">
                      <Link
                        title={category.name}
                        href={`category/${category.slug}`}
                        className="text-gray-100 "
                      >
                        <a>
                          {category.name}
                          {category.subCategories.length && (
                            <IoIosArrowUp
                              strokeWidth={2.5}
                              className={
                                "h-3.5 w-3.5 inline mr-2 transition-transform group-hover/item:rotate-180"
                              }
                            />
                          )}
                        </a>
                      </Link>
                      <ul className="menu-ul-hover bg-slate-300">
                        {category.subCategories.map((i, index) => (
                          <li key={index}>
                            <Link
                              title={i.name}
                              href={`category/${category.slug}/sub-category/${i.slug}`}
                              className="bg-slate-300 hover:bg-slate-400 text-gray-100"
                            >
                              <a>{i.name}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
