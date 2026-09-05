import { create } from "zustand";
import type { AreaWithProjects } from "@/types/AreaTypes/area.types";

interface AreaStore {
  areas: AreaWithProjects[];
  setAreas: (areas: AreaWithProjects[]) => void;
  addArea: (area: AreaWithProjects) => void;
}

export const useAreaStore = create<AreaStore>((set) => ({
  areas: [],

  setAreas: (areas) => set({ areas }),

  addArea: (area) =>
    set((state) => ({
      areas: [area, ...state.areas],
    })),
}));
