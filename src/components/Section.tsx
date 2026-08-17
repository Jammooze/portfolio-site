export default function Section({
  id,
  tone = "base",
  className = "",
  children,
}: {
  id: string;
  tone?: "base" | "alt";
  className?: string;
  children: React.ReactNode;
}) {
  const bg = tone === "alt" ? "bg-[var(--background-alt)]" : "bg-[var(--background)]";
  return (
    <section id={id} className={`w-full ${bg} scroll-mt-24 ${className}`}>
      <div className="max-w-6xl mx-auto px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
        {children}
      </div>
    </section>
  );
}
