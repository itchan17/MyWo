import { create } from "zustand";
import type { AreaWithProjects } from "@/types/area.types";

interface AreaStore {
  areas: AreaWithProjects[];
  setAreas: (areas: AreaWithProjects[]) => void;
  addArea: (area: AreaWithProjects) => void;
  updateArea: (area: AreaWithProjects) => void;
}

export const useAreaStore = create<AreaStore>((set) => ({
  areas: [],

  setAreas: (areas) => set({ areas }),

  addArea: (area) =>
    set((state) => ({
      areas: [area, ...state.areas],
    })),

  updateArea: (area) =>
    set((state) => ({
      areas: state.areas.map((a) => (a.id === area.id ? area : a)),
    })),
}));
