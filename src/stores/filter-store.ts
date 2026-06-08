import { create } from 'zustand'

export type SortOption = 'featured' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc'

export const SORT_LABELS: Record<SortOption, string> = {
  featured: 'Featured',
  price_asc: 'Price: Low to High',
  price_desc: 'Price: High to Low',
  name_asc: 'Name: A–Z',
  name_desc: 'Name: Z–A',
}

export type FilterStore = {
  search: string
  materials: string[]
  types: string[]
  inStockOnly: boolean
  selectedIds: number[]
  sortBy: SortOption
  setSearch: (q: string) => void
  toggleMaterial: (value: string) => void
  toggleType: (value: string) => void
  toggleInStockOnly: () => void
  toggleSelected: (id: number) => void
  setSortBy: (sort: SortOption) => void
  clearAll: () => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  search: '',
  materials: [],
  types: [],
  inStockOnly: false,
  selectedIds: [],
  sortBy: 'featured',

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

  setSortBy: (sort) => set({ sortBy: sort }),

  toggleSelected: (id) =>
    set((s) => ({
      selectedIds: s.selectedIds.includes(id)
        ? s.selectedIds.filter((v) => v !== id)
        : [...s.selectedIds, id],
    })),

  clearAll: () => set({ search: '', materials: [], types: [], inStockOnly: false }),
}))
