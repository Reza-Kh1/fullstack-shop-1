import React from "react";
import { FaStar } from "react-icons/fa";

export default function Reviews({ data }: any) {
  return (
    <>
      {data.map((i, index) => (
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
              <button
                className="text-span-light dark:text-span-dark bg-gray-900 dark:bg-gray-50 shadow-md px-3 py-1 rounded-md"
              >
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
    </>
  );
}
