import React, { useState } from "react";
import ImageTag from "../ImageTag/ImageTag";
import { FaMinus } from "react-icons/fa";
import { FaAngleLeft, FaPlus } from "react-icons/fa6";
import Link from "next/link";
type BoxProductType = {
  src?: string | any;
  alt?: string | null;
  subject?: string;
  description?: string;
  price?: number;
  id: number;
  skill?: string[];
};
export default function BoxProduct({
  src,
  alt,
  subject,
  description,
  price,
  id,
  skill,
}: BoxProductType) {
  const [open, setopen] = useState<number | null>(null);
  return (
    <div className="p-3 box-product  bg-slate-300 rounded-md overflow-hidden">
      <ImageTag
        src={src || ""}
        alt={alt || ""}
        classPlus="w-72"
        height={120}
        width={120}
      />
      <div className="pb-10">
        <span className="text-lg text-span-dark dark:text-span-light">
          {subject || ""}
        </span>
        <p className="text-sm">{description || ""}</p>
        <span className="mt-2">
          قیمت : {(price || 0).toLocaleString("fa")} تومان
        </span>
      </div>
      <div
        className={`flex flex-col justify-between bottom-down ${
          open === id ? "bottom-up" : null
        }`}
      >
        <div>
          <div
            className="w-full text-center inline-block mt-3 cursor-pointer"
            onClick={() => setopen(open === id ? null : id)}
          >
            {open === id ? (
              <>
                <span className="btn-box-product">
                  بستن
                  <FaMinus className="inline mr-2" />
                </span>
              </>
            ) : (
              <>
                <span className="btn-box-product">
                  نمایش بیشتر
                  <FaPlus className="inline mr-2" />
                </span>
              </>
            )}
          </div>
          <ul className="flex flex-col gap-2 mt-7 px-3">
            {skill?.length
              ? skill.map((i, indexs) => (
                  <li key={indexs}>
                    <i>
                      <FaAngleLeft className="ml-2 inline" />
                    </i>
                    {i}
                  </li>
                ))
              : ""}
          </ul>
        </div>
        <Link
          href={"/"}
          className="w-11/12 py-2 mb-6 mx-auto text-center rounded-md bg-blue-100 hover:bg-blue-400 hover:text-gray-50 shadow-md"
        >
          صفحه محصول
        </Link>
      </div>
    </div>
  );
}