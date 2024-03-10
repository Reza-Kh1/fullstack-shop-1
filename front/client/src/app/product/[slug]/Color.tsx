import React, { useState } from "react";

export default function Color() {
  const [color, setColor] = useState<string[]>();
  const data = ["آبی","",""]
  return (
    <div className="flex justify-between">
      <span
        // onClick={() => setColor()}
        className="py-2 px-5 shadow-md cursor-pointer rounded-md bg-gray-200 text-span-light dark:text-span-dark"
      >
        مشکی
      </span>
      <span
        // onClick={() => setColor()}
        className="py-2 px-5 shadow-md cursor-pointer rounded-md bg-gray-200 text-span-light dark:text-span-dark"
      >
        سبز
      </span>
      <span
        // onClick={() => setColor()}
        className="py-2 px-5 shadow-md cursor-pointer rounded-md bg-gray-200 text-span-light dark:text-span-dark"
      >
        آبی
      </span>
    </div>
  );
}
