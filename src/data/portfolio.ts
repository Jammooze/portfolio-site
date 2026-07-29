export const techStack = [
  { src: "/logos/vscode-original.svg", alt: "VS Code" },
  { src: "/logos/unrealengine-original.svg", alt: "Unreal Engine" },
  { src: "/logos/unity-original.svg", alt: "Unity" },
  { src: "/logos/python-original.svg", alt: "Python" },
  { src: "/logos/react-original.svg", alt: "React" },
  { src: "/logos/postgresql-original.svg", alt: "PostgreSQL" },
  { src: "/logos/nuxt-original.svg", alt: "Nuxt" },
  { src: "/logos/nextjs-original.svg", alt: "Next.js" },
  { src: "/logos/mysql-original.svg", alt: "MySQL" },
  { src: "/logos/maya-original.svg", alt: "Maya" },
  { src: "/logos/kotlin-original.svg", alt: "Kotlin" },
  { src: "/logos/jira-original.svg", alt: "Jira" },
  { src: "/logos/javascript-original.svg", alt: "JavaScript" },
  { src: "/logos/java-original.svg", alt: "Java" },
  { src: "/logos/git-plain.svg", alt: "Git" },
  { src: "/logos/csharp-plain.svg", alt: "C#" },
  { src: "/logos/blender-original.svg", alt: "Blender" },
  { src: "/logos/premiere-original.svg", alt: "Adobe Premiere" },
  { src: "/logos/photoshop-original.svg", alt: "Adobe Photoshop" },
];

// To add a new project, just append an object here — the homepage grid
// and tag filters pick it up automatically. `tags` drives the filter bar,
// so reuse existing tags where it makes sense (keeps the filter list tidy).
export type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  year?: string;
};

export const projects: Project[] = [
  {
    title: "Waxheart",
    description:
      "Working on cool stuff as a Technical Artist on Waxheart, a spooky adventure game.",
    image: "/images/waxheart_cover.png",
    link: "https://waxheart.info/",
    tags: ["Technical Art", "Game Dev", "Unity"],
    year: "Ongoing",
  },
  {
    title: "BOE Sidewalk Rover",
    description:
      "Autonomous sidewalk delivery rover built for the Bureau of Engineering capstone.",
    image: "/images/sidewalk_rover.jpg",
    link: "https://ascent.cysun.org/project/project/view/249",
    tags: ["Robotics", "Python"],
    year: "2025",
  },
  {
    title: "Cal Hacks 2023",
    description: "AI ChatBot using JavaFX and OpenAI GPT 3.5 Turbo API.",
    image: "/images/project2.png",
    link: "https://github.com/Jammooze/CalHacks2023",
    tags: ["Web", "AI"],
    year: "2023",
  },
  {
    title: "2D Unity Cafe Game",
    description: "Game development project using Unity and C#.",
    image: "/images/project3.png",
    link: "#",
    tags: ["Game Dev", "Unity"],
    year: "2023",
  },
];

export const animationVideos = [
  "https://player.vimeo.com/video/1129419310?h=030f3d6ebb",
  "https://player.vimeo.com/video/1151375419?h=5855ebc7d7",
  "https://player.vimeo.com/video/1099043533?h=e046a971d2",
];

export const techArtVideos = [
  "https://player.vimeo.com/video/1159140500?h=c1121c3207",
  "https://player.vimeo.com/video/1199435617?h=d5127add05",
];

export const galleryImages = [
  "/images/gallery/img1.png",
  "/images/gallery/img2.png",
  "/images/gallery/img3.png",
  "/images/gallery/img4.png",
  "/images/gallery/img5.png",
  "/images/gallery/img6.png",
  "/images/gallery/img7.png",
  "/images/gallery/img8.png",
];

export const recommendedGames = [
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
