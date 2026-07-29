import Image from "next/image";

type Tech = { src: string; alt: string };

export default function TechMarquee({ items }: { items: Tech[] }) {
  return (
    <div className="w-full bg-[var(--background)] border-y border-white/5">
      <p className="eyebrow text-center pt-8">Tools &amp; Technologies</p>
      <div
        className="w-full overflow-hidden py-8"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex w-max whitespace-nowrap items-center animate-marquee">
          {[...items, ...items].map((tech, index) => (
            <Image
              key={`${tech.alt}-${index}`}
              src={tech.src}
              alt={tech.alt}
              width={40}
              height={40}
              className="mx-8 h-9 w-auto shrink-0 grayscale brightness-0 invert opacity-40 transition duration-300 hover:grayscale-0 hover:brightness-100 hover:invert-0 hover:opacity-100 hover:scale-110"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
