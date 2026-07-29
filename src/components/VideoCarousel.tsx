"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CarouselControls from "./CarouselControls";

export default function VideoCarousel({ videos }: { videos: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () =>
    setCurrentIndex(
      currentIndex === 0 ? videos.length - 1 : currentIndex - 1
    );
  const next = () =>
    setCurrentIndex(
      currentIndex === videos.length - 1 ? 0 : currentIndex + 1
    );

  return (
    <div className="flex flex-col w-full lg:w-2/3 items-center">
      <div className="w-full max-w-[900px] aspect-video rounded-xl shadow-lg overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.iframe
            key={currentIndex}
            src={videos[currentIndex]}
            title={`vimeo-player-${currentIndex}`}
            loading="lazy"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            className="w-full h-full"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>
      <CarouselControls onPrev={prev} onNext={next} />
    </div>
  );
}
