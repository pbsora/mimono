"use client";
import Image from "next/image";
import { useState } from "react";

const MovieImage = ({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) => {
  const [imageError, setImageError] = useState(false);
  console.log(imageError);

  return (
    <Image
      src={imageError ? "/fallback.png" : src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setImageError(true)}
      className="rounded-lg"
    />
  );
};

export default MovieImage;
