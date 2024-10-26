import { create } from "zustand";

interface TrackIdStore {
  trackId: string;
  addTrackId: (id: string) => void;
}

export const useTrackStore = create<TrackIdStore>((set) => {
  const savedTrackId =
    localStorage.getItem("track_id") || "4JLcAU2xY90qTkTSNM1lUa";

  return {
    trackId: savedTrackId,
    addTrackId: (id: string) => {
      set({ trackId: id });
      localStorage.setItem("track_id", id);
    },
  };
});
