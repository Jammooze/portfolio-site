export default function CarouselControls({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={onPrev}
        aria-label="Previous"
        className="px-4 py-2 bg-gray-800/70 text-white rounded-full hover:bg-gray-700 transition"
      >
        ◀
      </button>
      <button
        onClick={onNext}
        aria-label="Next"
        className="px-4 py-2 bg-gray-800/70 text-white rounded-full hover:bg-gray-700 transition"
      >
        ▶
      </button>
    </div>
  );
}
