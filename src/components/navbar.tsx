"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  /* ---------------- Scroll detection ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  /* ---------------- Navigation helpers ---------------- */
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const handleNavigation = (id: string) => {
    if (window.location.pathname !== "/") {
      router.push("/");
      setTimeout(() => scrollToSection(id), 100);
    } else {
      scrollToSection(id);
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed top-0 left-0 w-full z-50 bg-gray-900/90 backdrop-blur-md"
    >
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4">
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a href="https://www.artstation.com/jammooze" target="_blank">
            <Image
              src="/images/artstation_icon.png"
              alt="ArtStation"
              width={40}
              height={40}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/james-nguyen-45a6a8208/"
            target="_blank"
          >
            <Image
              src="/images/linkedin_icon.png"
              alt="LinkedIn"
              width={40}
              height={40}
            />
          </a>
          <a href="https://www.instagram.com/yamesnewyen/" target="_blank">
            <Image
              src="/images/instagram_icon.png"
              alt="Instagram"
              width={40}
              height={40}
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-2xl font-bold">
          <button
            onClick={() => handleNavigation("about")}
            className="hover:text-blue-400"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("projects")}
            className="hover:text-blue-400"
          >
            Projects
          </button>
          <button
            onClick={() => handleNavigation("animations")}
            className="hover:text-blue-400"
          >
            Animations
          </button>
          <button
            onClick={() => handleNavigation("tech-art")}
            className="hover:text-blue-400"
          >
            Tech-Art
          </button>
          <button
            onClick={() => handleNavigation("game-dev")}
            className="hover:text-blue-400"
          >
            Game-Dev
          </button>
          <button
            onClick={() => handleNavigation("contact")}
            className="hover:text-blue-400"
          >
            Contact
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-white ${
              menuOpen && "rotate-45 translate-y-1.5"
            }`}
          />
          <span className={`w-6 h-0.5 bg-white ${menuOpen && "opacity-0"}`} />
          <span
            className={`w-6 h-0.5 bg-white ${
              menuOpen && "-rotate-45 -translate-y-1.5"
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="md:hidden bg-gray-900/95 flex flex-col items-center gap-4 py-4 font-bold"
          >
            <button onClick={() => handleNavigation("about")}>About</button>
            <button onClick={() => handleNavigation("projects")}>
              Projects
            </button>
            <button onClick={() => handleNavigation("animations")}>
              Animations
            </button>
            <button onClick={() => handleNavigation("tech-art")}>
              Tech-Art
            </button>
            <button onClick={() => handleNavigation("game-dev")}>
              Game-Dev
            </button>
            <button onClick={() => handleNavigation("contact")}>Contact</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
