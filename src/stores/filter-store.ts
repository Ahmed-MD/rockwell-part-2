import { create } from 'zustand'

export type FilterStore = {
  search: string
  materials: string[]
  types: string[]
  inStockOnly: boolean
  setSearch: (q: string) => void
  toggleMaterial: (value: string) => void
  toggleType: (value: string) => void
  toggleInStockOnly: () => void
  clearAll: () => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  search: '',
  materials: [],
  types: [],
  inStockOnly: false,

  setSearch: (q) => set({ search: q }),

  toggleMaterial: (value) =>
    set((s) => ({
      materials: s.materials.includes(value)
        ? s.materials.filter((v) => v !== value)
        : [...s.materials, value],
    })),

  toggleType: (value) =>
    set((s) => ({
      types: s.types.includes(value)
        ? s.types.filter((v) => v !== value)
        : [...s.types, value],
    })),

  toggleInStockOnly: () => set((s) => ({ inStockOnly: !s.inStockOnly })),

  clearAll: () => set({ search: '', materials: [], types: [], inStockOnly: false }),
}))
