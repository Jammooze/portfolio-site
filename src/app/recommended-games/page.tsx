"use client";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { recommendedGames } from "@/data/portfolio";

export default function RecommendedGames() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[var(--background)] text-white font-rubik">
      <Navbar />

      <div className="w-full max-w-4xl px-5 sm:px-6 pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 flex flex-col items-center">
        <div className="mb-6 sm:mb-10 lg:mb-12 relative w-full max-w-[400px] aspect-[4/1]">
          <Image
            src="/images/cat-gaming.png"
            alt="Games Banner"
            fill
            sizes="400px"
            className="rounded-xl shadow-lg object-cover"
          />
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-6 sm:mb-10 lg:mb-12 text-center">
          YOU NEED TO PLAY THESE GAMES! 🎮
        </h1>

        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 w-full">
          {recommendedGames.map((game) => (
            <a
              key={game.title}
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer w-full"
            >
              <div className="relative w-full aspect-video">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-4 rounded-xl">
                <h3 className="text-3xl mb-4 text-white">{game.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
