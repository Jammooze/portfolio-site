"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

const links = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "animations", label: "Animations" },
  { id: "tech-art", label: "Tech-Art" },
  { id: "game-dev", label: "Game-Dev" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [activeId, setActiveId] = useState<string>("");
  const lastScrollY = useRef(0);
  const router = useRouter();
  const pathname = usePathname();

  /* ---------------- Scroll detection ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- Scroll-spy for active section ---------------- */
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

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
      className="fixed top-0 left-0 w-full z-50 bg-gray-900/90 backdrop-blur-md border-b border-white/5"
    >
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto">
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.artstation.com/jammooze"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/artstation_icon.png"
              alt="ArtStation"
              width={32}
              height={32}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/james-nguyen-45a6a8208/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/linkedin_icon.png"
              alt="LinkedIn"
              width={32}
              height={32}
            />
          </a>
          <a
            href="https://www.instagram.com/yamesnewyen/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/instagram_icon.png"
              alt="Instagram"
              width={32}
              height={32}
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-lg font-bold">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigation(link.id)}
              className={`relative pb-1 transition ${
                activeId === link.id
                  ? "text-blue-400"
                  : "text-white hover:text-blue-400"
              }`}
            >
              {link.label}
              {activeId === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-400 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
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
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigation(link.id)}
                className={activeId === link.id ? "text-blue-400" : "text-white"}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
