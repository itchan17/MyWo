import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Project } from "@/types/project.types";

interface ProjectSectionProps {
  areaProjects: Project[];
}

export default function ProjectSection({ areaProjects }: ProjectSectionProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    setProjects(areaProjects);
  }, [areaProjects]);

  return (
    <section className="flex min-h-0 flex-1 flex-col space-y-3">
      <header className="flex justify-between items-center">
        <h1 className="text-base font-semibold">Projects</h1>
        <Button onClick={() => setOpenForm(true)}>
          <Plus /> New Project
        </Button>
      </header>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ProjectCard
              name={project.name}
              description={project.description}
              startDate={project.startDate}
              dueDate={project.dueDate}
            />
          </div>
        ))
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-600">No Projects</p>
        </div>
      )}
    </section>
  );
}
