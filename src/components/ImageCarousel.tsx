"use client";
import { useState } from "react";
import Image from "next/image";
import CarouselControls from "./CarouselControls";

export default function ImageCarousel({
  images,
  altPrefix,
}: {
  images: string[];
  altPrefix: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () =>
    setCurrentIndex(
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    );
  const next = () =>
    setCurrentIndex(
      currentIndex === images.length - 1 ? 0 : currentIndex + 1
    );

  return (
    <div className="flex flex-col w-full sm:w-1/2 items-center">
      <div className="w-full relative flex justify-center">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg bg-gray-800/40">
          <Image
            src={images[currentIndex]}
            alt={`${altPrefix} ${currentIndex + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, 500px"
            className="object-contain"
            priority
          />
        </div>
      </div>
      <CarouselControls onPrev={prev} onNext={next} />
    </div>
  );
}
