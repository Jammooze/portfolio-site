import Image from "next/image";
import Navbar from "@/components/navbar";
import Section from "@/components/Section";
import TechMarquee from "@/components/TechMarquee";
import ImageCarousel from "@/components/ImageCarousel";
import VideoCarousel from "@/components/VideoCarousel";
import ProjectsGrid from "@/components/ProjectsGrid";
import SectionIntro from "@/components/SectionIntro";
import AnimationsSeeMore from "@/components/AnimationsSeeMore";
import Footer from "@/components/Footer";
import {
  techStack,
  projects,
  animationVideos,
  animationDetails,
  techArtVideos,
  techArtDetails,
  galleryImages,
} from "@/data/portfolio";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[var(--background)] text-white font-rubik relative">
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative w-full h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden pt-24 sm:pt-28 lg:pt-32"
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        >
          <source src="/images/gameplayFootage.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-900/80" />
        <div className="relative z-10 flex flex-col items-center justify-center px-6">
          <div className="mb-4 sm:mb-6 relative flex items-center justify-center">
            <div className="absolute w-[190px] h-[190px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px] rounded-full bg-blue-500/50 blur-3xl animate-pulse-glow" />
            <div className="relative animate-float">
              <Image
                src="/images/jimmypfp.png"
                alt="James Nguyen"
                width={250}
                height={250}
                priority
                className="w-[160px] h-[160px] sm:w-[210px] sm:h-[210px] lg:w-[250px] lg:h-[250px] object-cover rounded-full border-4 border-blue-500 shadow-lg shadow-blue-500/30 transition-transform duration-300 hover:scale-105"
              />

              {/* Discord-style status badge */}
              <div className="absolute bottom-1 right-1 translate-x-[12%] translate-y-[10%] flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-gray-900 border border-gray-700 shadow-lg">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-[11px] sm:text-xs font-medium text-gray-200 whitespace-nowrap">
                  Currently Studying at Gnomon
                </span>
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4">
            James Nguyen
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 sm:mb-8 text-center max-w-md">
            Software Developer / Animator / Technical Artist
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pb-8 sm:pb-12 lg:pb-16">
            <a
              href="https://www.artstation.com/jammooze"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              ArtStation
            </a>
            <a
              href="/resume/james_nguyen_resume_26.pdf"
              className="btn-secondary"
            >
              Resume
            </a>
          </div>
        </div>
      </section>

      <TechMarquee items={techStack} />

      {/* About Me Section */}
      <Section id="about" tone="base">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
          <ImageCarousel images={galleryImages} altPrefix="Gallery" />

          <div className="sm:w-1/2 text-center sm:text-left">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
              Hey, I&apos;m James!👋
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              I&apos;ve always been curious about technology and art, and I
              love finding ways to bring the two together. Right now I&apos;m
              spending most of my time getting better at interactive media,
              3D animation, film, and game development.
            </p>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mt-4">
              I actually started out studying computer science, which gave me
              a solid technical foundation to build on. Somewhere along the
              way I fell in love with 3D animation, filmmaking, and games.
              They let me combine problem-solving with storytelling, which is
              honestly my favorite combination. Whether I&apos;m animating a
              character, building something interactive, or just messing
              around with a new tool, I&apos;m always down to create,
              experiment, and see where it takes me.
            </p>
            <div className="mt-6 flex justify-center sm:justify-start">
              <a
                href="/recommended-games"
                className="group relative inline-flex items-center"
              >
                <Image
                  src="/images/glorp-button.png"
                  alt="You've Gotta Play These!"
                  width={150}
                  height={97}
                  className="drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                />
                <span className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                  You&apos;ve gotta play these games!
                  <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" tone="alt">
        <div className="max-w-2xl mb-6 sm:mb-10 text-center md:text-left mx-auto md:mx-0">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            Projects
          </h2>
          <h3 className="text-lg sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-blue-400">
            Check out some cool stuff...
          </h3>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            I like building things that sit somewhere between creative and
            technical: web apps, animation tools, little scripts that make
            someone&apos;s day a bit easier. This grid keeps growing as I
            finish new stuff, so check back every once in a while.
          </p>
        </div>

        <ProjectsGrid projects={projects} />
      </Section>

      {/* Animations Section */}
      <Section id="animations" tone="base">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <VideoCarousel videos={animationVideos} />

          <div className="lg:w-1/3">
            <SectionIntro
              title="Animations"
              eyebrow="I'm learning 3D Animation!"
            >
              Animation has inspired me for as long as I can remember. I grew
              up watching Pixar films, and <em>Toy Story 2</em> is still my
              favorite to this day. What started as admiration for great
              storytelling has become the career I&apos;m working toward. My
              goal is to contribute to a film or game as a 3D Character
              Animator, and I&apos;m always looking for opportunities to
              learn, improve, and get one step closer.
            </SectionIntro>
            <AnimationsSeeMore videos={animationDetails} />
          </div>
        </div>
      </Section>

      {/* Tools-Pipeline Section */}
      <Section id="tech-art" tone="alt">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="lg:w-1/3">
            <SectionIntro title="Tech & Art" eyebrow="Supporting Artists">
              I like building tools that make an artist&apos;s day easier.
              Sometimes that&apos;s a pipeline script, sometimes it&apos;s a
              small utility that saves an animator from doing the same
              tedious task fifty times. Lately I&apos;ve also been teaching
              myself character rigging.
            </SectionIntro>
            <AnimationsSeeMore videos={techArtDetails} heading="Tech & Art Work" />
          </div>

          <VideoCarousel videos={techArtVideos} />
        </div>
      </Section>

      {/* Game Dev Section */}
      <Section id="game-dev" tone="base">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Left: Video */}
          <div className="md:w-2/3 w-full flex justify-center">
            <div className="w-full max-w-[900px] aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="silly-class-project"
                src="https://player.vimeo.com/video/1159159700?h=1d10f220a6"
                className="w-full h-full"
                loading="lazy"
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
              />
            </div>
          </div>

          <div className="md:w-1/3">
            <SectionIntro title="Game Dev" eyebrow="My first Game Jam">
              Back in fall 2025, my friend and I set out to make something
              completely ridiculous for our campus game jam. It wasn&apos;t
              meant to be a serious project, just a chance to mess around,
              learn some new tools, and have fun making something together.
              <br />
              <br />I&apos;m hoping to do a lot more of these.
            </SectionIntro>
          </div>
        </div>
      </Section>

      {/* Contact Me Section */}
      <Section id="contact" tone="alt">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-12 items-start">
          <div className="md:w-1/3 text-center md:text-left">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 lg:mb-10">
              Contact Me
            </h2>
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-blue-400">
              Let&apos;s Connect!
            </h3>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              I genuinely enjoy meeting other developers and artists, trading
              ideas, and hearing about what people are working on. If you
              want to talk about a project, an opportunity, or just nerd out
              about animation and games, my inbox is always open.
            </p>
            <a
              href="mailto:nguyejames03@gmail.com"
              className="btn-primary mt-6"
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
                playsInline
                preload="none"
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
      </Section>

      <Footer />
    </div>
  );
}
