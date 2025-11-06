"use client";
import Image from "next/image";
import Navbar from "@/components/navbar";

const recommendedGames = [
  {
    title: "Adhoc Studio",
    image: "/images/games/dispatch.png",
    link: "https://www.adhocla.com/",
  },
  {
    title: "Larian Studios",
    image: "/images/games/baldurs_gate_3.png",
    link: "https://baldursgate3.game/",
  },
  {
    title: "FromSoftware Inc",
    image: "/images/games/elden_ring.png",
    link: "https://en.bandainamcoent.eu/elden-ring/elden-ring",
  },
  {
    title: "Team Cherry",
    image: "/images/games/silk_song.png",
    link: "https://hollowknightsilksong.com/",
  },
  {
    title: "WarHorse Studios",
    image: "/images/games/kingdomcome-deliverance-2.jpg",
    link: "https://www.deepsilver.com/games/kingdom-come-deliverance-ii",
  },
  {
    title: "Supergiant Games",
    image: "/images/games/hades2.png",
    link: "https://www.supergiantgames.com/games/hades-ii/",
  },
  {
    title: "Sandfall Interactive",
    image: "/images/games/expedition33.png",
    link: "https://www.expedition33.com/",
  },
];

export default function RecommendedGames() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white px-6 py-16 font-rubik">
      <Navbar />
      {/* Top Image */}
      <div className="mb-12">
        <Image
          src="/images/cat-gaming.png" // replace with your image
          alt="Games Banner"
          width={400}
          height={100}
          className="rounded-xl shadow-lg object-cover"
        />
      </div>

      <h1 className="text-6xl font-bold mb-12 text-center">
        YOU NEED TO PLAY THESE GAMES! 🎮
      </h1>

      <div className="flex flex-col gap-12 w-full max-w-4xl">
        {recommendedGames.map((game, index) => (
          <a
            key={index}
            href={game.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer w-full"
          >
            <Image
              src={game.image}
              alt={game.title}
              width={1200}
              height={675}
              className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-4 rounded-xl">
              <h3 className="text-3xl mb-4 text-white">{game.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
