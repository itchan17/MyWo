export interface Project {
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
