import type { Project } from "./project.types";

export interface AreaForm {
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Area {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface AreaWithProjects extends Area {
  projects: Project[];
}
