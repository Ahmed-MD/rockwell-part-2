import { create } from 'zustand'

export type FilterStore = {
  search: string
  materials: string[]
  types: string[]
  inStockOnly: boolean
  selectedIds: number[]
  setSearch: (q: string) => void
  toggleMaterial: (value: string) => void
  toggleType: (value: string) => void
  toggleInStockOnly: () => void
  toggleSelected: (id: number) => void
  clearAll: () => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  search: '',
  materials: [],
  types: [],
  inStockOnly: false,
  selectedIds: [],

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

  toggleSelected: (id) =>
    set((s) => ({
      selectedIds: s.selectedIds.includes(id)
        ? s.selectedIds.filter((v) => v !== id)
        : [...s.selectedIds, id],
    })),

  clearAll: () => set({ search: '', materials: [], types: [], inStockOnly: false }),
}))
