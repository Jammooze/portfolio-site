"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/navbar";

const techStack = [
  { src: "/logos/vscode-original.svg", alt: "VS Code" },
  { src: "/logos/unrealengine-original.svg", alt: "Unreal Engine" },
  { src: "/logos/unity-original.svg", alt: "Unity" },
  { src: "/logos/typescript-original.svg", alt: "TypeScript" },
  { src: "/logos/tensorflow-original.svg", alt: "TensorFlow" },
  { src: "/logos/python-original.svg", alt: "Python" },
  { src: "/logos/react-original.svg", alt: "React" },
  { src: "/logos/postgresql-original.svg", alt: "PostgreSQL" },
  { src: "/logos/nuxt-original.svg", alt: "Nuxt" },
  { src: "/logos/opencv-original.svg", alt: "OpenCV" },
  { src: "/logos/nextjs-original.svg", alt: "Next.js" },
  { src: "/logos/mysql-original.svg", alt: "MySQL" },
  { src: "/logos/mongodb-original.svg", alt: "MongoDB" },
  { src: "/logos/maya-original.svg", alt: "Maya" },
  { src: "/logos/lua-original.svg", alt: "Lua" },
  { src: "/logos/kotlin-original.svg", alt: "Kotlin" },
  { src: "/logos/jira-original.svg", alt: "Jira" },
  { src: "/logos/javascript-original.svg", alt: "JavaScript" },
  { src: "/logos/java-original.svg", alt: "Java" },
  { src: "/logos/git-plain.svg", alt: "Git" },
  { src: "/logos/csharp-plain.svg", alt: "C#" },
  { src: "/logos/cplusplus-original.svg", alt: "C++" },
  { src: "/logos/apache-original.svg", alt: "Apache" },
  { src: "/logos/amazonwebservices-original-wordmark.svg", alt: "AWS" },
];

const projects = [
  {
    title: "BOE Sidewalk Rover",
    description: "Fall 2025",
    image: "/images/sidewalk_rover.jpg",
    link: "https://ascent.cysun.org/project/project/view/249",
  },
  {
    title: "Cal Hacks 2023",
    description: "AI ChatBot using JavaFX and OpenAI&apos;s GPT 3.5 Turbo API",
    image: "/images/project2.png",
    link: "https://github.com/Jammooze/CalHacks2023",
  },
  {
    title: "2D Unity Cafe Game",
    description: "Game development project using Unity and C#.",
    image: "/images/project3.png",
    link: "#",
  },
];

const animationVideos = [
  "https://player.vimeo.com/video/1129419310?h=030f3d6ebb",
  "https://player.vimeo.com/video/1099043533?h=e046a971d2",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryImages = [
    "/images/gallery/img1.png",
    "/images/gallery/img2.png",
    "/images/gallery/img3.png",
    "/images/gallery/img4.png",
    "/images/gallery/img5.png",
    "/images/gallery/img6.png",
    "/images/gallery/img7.png",
    "/images/gallery/img8.png",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const nextVideo = () =>
    setCurrentVideoIndex(
      currentVideoIndex === animationVideos.length - 1
        ? 0
        : currentVideoIndex + 1
    );

  const prevVideo = () =>
    setCurrentVideoIndex(
      currentVideoIndex === 0
        ? animationVideos.length - 1
        : currentVideoIndex - 1
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-gray-900 to-gray-800 text-white font-rubik relative">
      <div className="fixed top-0 left-0 w-full z-50 bg-gray-900/90 backdrop-blur-md">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative w-full h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden pt-32"
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/images/gameplayFootage.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-900/80"></div>
        <div className="relative z-10 flex flex-col items-center justify-center px-6">
          <div className="mb-6">
            <Image
              src="/images/jimmypfp.png"
              alt="James Nguyen"
              width={250}
              height={250}
              className="rounded-full border-4 border-blue-500 shadow-lg"
            />
          </div>
          <h1 className="text-5xl font-extrabold mb-4">James Nguyen</h1>
          <p className="text-lg text-gray-300 mb-8 text-center max-w-md">
            A showcase of my work as a <br />
            Software Engineer / Animator / Developer
          </p>
          <div className="flex gap-4 pb-16">
            <a
              href="https://www.artstation.com/jammooze"
              className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 transition font-medium"
            >
              ArtStation
            </a>
            <a
              href="/resume/jNguyen_Resume24_e.pdf"
              className="px-6 py-3 rounded-full border border-gray-400 hover:bg-gray-700 transition font-medium"
            >
              Resume
            </a>
          </div>
        </div>
      </section>

      {/* TechStack Marquee */}
      <div className="pt-8 bottom-20 w-full overflow-hidden pt-16">
        <motion.div
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...techStack, ...techStack].map((tech, index) => (
            <motion.img
              key={index}
              src={tech.src}
              alt={tech.alt}
              className="mx-8 h-10 w-auto opacity-70 hover:opacity-100 transition"
            />
          ))}
        </motion.div>
      </div>

      {/* About Me Section */}
      <section id="about" className="w-full max-w-6xl px-6 py-16 mx-auto pt-24">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="flex flex-col sm:w-1/2 items-center">
            <div className="w-full relative flex justify-center">
              <Image
                src={galleryImages[currentIndex]}
                alt={`Project ${currentIndex + 1}`}
                width={500}
                height={350}
                className="rounded-lg shadow-lg object-cover"
                priority // <-- preload image
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() =>
                  setCurrentIndex(
                    currentIndex === 0
                      ? galleryImages.length - 1
                      : currentIndex - 1
                  )
                }
                className="px-4 py-2 bg-gray-800/70 text-white rounded-full hover:bg-gray-700 transition"
              >
                ◀
              </button>
              <button
                onClick={() =>
                  setCurrentIndex(
                    currentIndex === galleryImages.length - 1
                      ? 0
                      : currentIndex + 1
                  )
                }
                className="px-4 py-2 bg-gray-800/70 text-white rounded-full hover:bg-gray-700 transition"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="sm:w-1/2 text-center sm:text-left">
            <h1 className="text-6xl font-bold mb-4">Hey, I&apos;m James!👋</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              I&apos;m a student passionate about Technology and 3D Animation. I
              love blending technology and creativity to build interactive
              experiences and animations. My journey started in computer
              science, but my love for art and storytelling has driven me to
              explore animation, game development, and creative coding projects.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mt-4">
              I&apos;m always learning new tools and techniques to push the
              boundaries of what I can create, whether it&apos;s designing
              animations, building web applications, or collaborating on
              creative projects with other artists and developers.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mt-4">
              Check out some of my favorite games!
            </p>
            <div className="mt-6">
              <a
                href="/recommended-games"
                className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 transition font-medium"
              >
                You&apos;ve Gotta Play These!
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="w-full max-w-6xl px-6 py-16 mx-auto pt-24"
      >
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3 text-center md:text-left">
            <h1 className="text-6xl font-bold mb-10">Projects 💻</h1>
            <h2 className="text-3xl font-semibold mb-4">What I Build...</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              I enjoy working on projects that combine creativity and technology
              &mdash; from interactive web apps and animations to tools that
              enhance the player and user experience. Each project represents
              something I&apos;ve learned and refined along my journey as a
              developer and artist.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:w-2/3">
            {projects.map((project, index) => (
              <div
                key={index}
                className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-4">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-medium transition"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animations Section */}
      <section
        id="animations"
        className="w-full max-w-7xl px-6 py-16 mx-auto pt-32"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col w-full lg:w-2/3 items-center">
            <div className="w-full max-w-[900px] aspect-video rounded-xl shadow-lg overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.iframe
                  key={currentVideoIndex}
                  src={animationVideos[currentVideoIndex]}
                  title={`vimeo-player-${currentVideoIndex}`}
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

            <div className="flex gap-4 mt-4">
              <button
                onClick={prevVideo}
                className="px-4 py-2 bg-gray-800/70 text-white rounded-full hover:bg-gray-700 transition"
              >
                ◀
              </button>
              <button
                onClick={nextVideo}
                className="px-4 py-2 bg-gray-800/70 text-white rounded-full hover:bg-gray-700 transition"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="md:w-1/3 text-center md:text-left">
            <h1 className="text-6xl font-bold mb-10">Animations</h1>
            <h2 className="text-3xl font-semibold mb-4 text-white">
              I&apos;m learning 3D Animation!
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              I learned animation using Maya and applied my skills in game and
              cinematic projects. This section showcases some of my work in 3D
              animation and the techniques I&apos;ve explored along the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Me Section */}
      <section id="contact" className="w-full max-w-6xl px-6 py-16 mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3 text-center md:text-left">
            <h1 className="text-6xl font-bold mb-10">Contact Me</h1>
            <h2 className="text-3xl font-semibold mb-4">Let&apos;s Connect!</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              I love collaborating on exciting projects, sharing knowledge, and
              connecting with fellow developers and artists. Feel free to reach
              out via email or social media &mdash; I&apos;d be happy to chat
              about opportunities, projects, or just creative ideas.
            </p>
            <a
              href="mailto:nguyejames03@gmail.com"
              className="mt-4 inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition"
            >
              nguyejames03@gmail.com
            </a>
          </div>

          <div className="w-full md:w-2/3 flex flex-col items-center">
            <div className="relative group w-full rounded-xl overflow-hidden shadow-lg">
              <video
                src="/images/jabillson-gaming.mp4"
                className="w-full object-cover"
                autoPlay
                loop
                muted
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a
                  href="https://youtube.com/@jabillson?si=qX-Me7sbUl4qG5g4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition"
                >
                  Gaming Videos
                </a>
              </div>
            </div>
            <p className="text-gray-300 text-center mt-4 text-lg">
              &quot;Study? Nah we gaming!&quot; - Jabillson
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-gray-500 text-sm py-6">
        &copy; 2024 Built by James Nguyen
      </footer>
    </div>
  );
}
