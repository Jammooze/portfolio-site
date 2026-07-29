"use client";
import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/portfolio";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeTag, setActiveTag] = useState<string>("All");

  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(
    () =>
      activeTag === "All"
        ? projects
        : projects.filter((p) => p.tags.includes(activeTag)),
    [projects, activeTag]
  );

  // Only bother showing the filter bar once there's enough to filter.
  const showFilters = tags.length > 2;

  return (
    <div className="w-full">
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="chip"
              data-active={activeTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
