"use client";
import React, { useState } from "react";
import LoadingImage from "../LoadingImage/LoadingImage";
import Image from "next/image";
import ImageError from "@/../public/errorImage.webp";
type Image = {
  src: any;
  alt: string;
  className?: string;
  width: number;
  height: number;
  classPlus?: string;
};
export default function ImageTag({
  src,
  alt,
  className,
  height,
  width,
  classPlus,
}: Image) {
  const [load, setLoad] = useState<boolean>(true);
  const [srcError, setSrcError] = useState<any>();
  return (
    <figure className="relative">
      <Image
        width={width}
        height={height}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/gif;base64,..."
        onLoad={() => setLoad(false)}
        src={srcError || src || ""}
        alt={alt || ""}
        className={
          className ||
          `${classPlus} rounded-md shadow-md  table mx-auto` ||
          "rounded-md shadow-md w-full h-full table mx-auto"
        }
        onError={() => setSrcError(ImageError)}
      />
      {load && <LoadingImage />}
    </figure>
  );
}
