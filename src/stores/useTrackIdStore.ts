import { create } from "zustand";

interface TrackIdStore {
  trackId: string;
  addTrackId: (id: string) => void;
}

export const useTrackStore = create<TrackIdStore>((set) => ({
  trackId: "4JLcAU2xY90qTkTSNM1lUa",
  addTrackId: (id: string) => set({ trackId: id }),
}));
