import { create } from "zustand";

interface SearchStore {
  query: string;
  setQuery: (query: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => {
  const savedQuery = localStorage.getItem("search_query") || "";

  return {
    query: savedQuery,
    setQuery: (query: string) => {
      set({ query });
      localStorage.setItem("search_query", query);
    },
  };
});
