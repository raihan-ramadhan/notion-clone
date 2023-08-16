import { create } from "zustand";

type Store = {
  showDekstopSidebar: boolean;
  toggleDekstopSidebar: () => void;
};

export const useShowSidebar = create<Store>()((set) => ({
  showDekstopSidebar: true,
  toggleDekstopSidebar: () =>
    set((state) => ({ showDekstopSidebar: !state.showDekstopSidebar })),
}));
