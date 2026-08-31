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

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
