import Image from "next/image";
import type { Project } from "@/data/portfolio";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.link}
      target={project.link === "#" ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-xl overflow-hidden shadow-lg bg-gray-800/60 border border-white/5 hover:border-blue-500/40 transition-colors cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="px-4 py-2 bg-blue-500 group-hover:bg-blue-600 rounded-full text-white font-medium transition">
            View Project
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          {project.year && (
            <span className="text-xs text-gray-500 shrink-0">{project.year}</span>
          )}
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
