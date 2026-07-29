export default function Footer() {
  return (
    <footer className="w-full bg-[var(--background)] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
        <span>&copy; {new Date().getFullYear()} Built by James Nguyen</span>
        <a href="mailto:nguyejames03@gmail.com" className="hover:text-blue-400 transition">
          nguyejames03@gmail.com
        </a>
      </div>
    </footer>
  );
}
