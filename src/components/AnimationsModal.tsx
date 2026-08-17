"use client";
import { useEffect } from "react";
import type { AnimationDetail } from "@/data/portfolio";

export default function AnimationsModal({
  videos,
  open,
  onClose,
  heading = "Animation Work",
}: {
  videos: AnimationDetail[];
  open: boolean;
  onClose: () => void;
  heading?: string;
}) {
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={heading}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-2xl bg-gray-900 border border-gray-700 shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-10">
          <h3 className="text-2xl font-bold">{heading}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 flex items-center justify-center rounded-full text-xl text-gray-400 transition hover:bg-gray-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-10 px-6 py-8">
          {videos.map((video, index) => (
            <div key={video.url} className="flex flex-col md:flex-row gap-6">
              <div className="w-full shrink-0 md:w-3/5">
                <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                  <iframe
                    title={`animation-modal-${index}`}
                    src={video.url}
                    className="h-full w-full"
                    loading="lazy"
                    frameBorder="0"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="w-full md:w-2/5">
                <h4 className="mb-3 text-xl font-bold text-white">
                  {video.title}
                </h4>
                <ul className="space-y-2">
                  {video.description.map((line, lineIndex) => (
                    <li
                      key={lineIndex}
                      className="flex gap-2 text-gray-300 leading-relaxed"
                    >
                      <span className="text-blue-400">-</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
