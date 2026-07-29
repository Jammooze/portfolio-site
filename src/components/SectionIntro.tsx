export default function SectionIntro({
  title,
  eyebrow,
  children,
  align = "left",
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  const textAlign = align === "center" ? "text-center" : "text-center md:text-left";
  return (
    <div className={textAlign}>
      <h2 className="text-5xl sm:text-6xl font-bold mb-3 tracking-tight">
        {title}
      </h2>
      <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-400">
        {eyebrow}
      </h3>
      <p className="text-gray-300 text-lg leading-relaxed">{children}</p>
    </div>
  );
}
