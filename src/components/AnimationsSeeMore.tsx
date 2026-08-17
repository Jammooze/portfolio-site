"use client";
import { useState } from "react";
import AnimationsModal from "./AnimationsModal";
import type { AnimationDetail } from "@/data/portfolio";

export default function AnimationsSeeMore({
  videos,
  heading,
}: {
  videos: AnimationDetail[];
  heading?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-6 flex justify-center lg:justify-start">
        <button onClick={() => setOpen(true)} className="btn-secondary">
          See More
        </button>
      </div>
      <AnimationsModal
        videos={videos}
        open={open}
        onClose={() => setOpen(false)}
        heading={heading}
      />
    </>
  );
}
