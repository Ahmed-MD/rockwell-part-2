import { useState, useRef, useEffect, useMemo } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { useFilterStore, SORT_LABELS, type SortOption } from '@/stores/filter-store'
import { componentTokens, colors, spacing, fontSize, fontWeight, borderRadius } from '@/tokens'
import ProductCard, { type Product } from '@/components/ProductCard'

const SORT_OPTIONS: SortOption[] = ['featured', 'price_asc', 'price_desc', 'name_asc', 'name_desc']

const parsePrice = (price: string) => parseFloat(price.replace(/[^0-9.]/g, ''))

// ─── Filter Chip ──────────────────────────────────────────────────────────────

function FilterChip({ label, onDismiss }: { label: string; onDismiss: () => void }) {
  const [hovered, setHovered] = useState(false)
  const fc = componentTokens.filterChip

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: fc.gap,
        background: fc.background,
        borderRadius: fc.borderRadius,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 8,
      }}
    >
      <span style={{ fontSize: fc.label.fontSize, fontWeight: fc.label.fontWeight, color: fc.label.color }}>
        {label}
      </span>
      <button
        onClick={onDismiss}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: hovered ? colors.ink : fc.dismiss.color,
          transition: 'color 0.15s',
          lineHeight: 1,
        }}
      >
        <X size={fc.dismiss.fontSize} strokeWidth={2} />
      </button>
    </div>
  )
}

// ─── Sort Dropdown ────────────────────────────────────────────────────────────

function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { sortBy, setSortBy } = useFilterStore()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sd = componentTokens.sortDropdown

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  const handleSelect = (option: SortOption) => {
    setSortBy(option)
    setIsOpen(false)
  }

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        style={{
          minWidth: sd.width,
          height: sd.height,
          background: sd.background,
          borderRadius: isOpen ? `${sd.borderRadius}px ${sd.borderRadius}px 0 0` : sd.borderRadius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 12,
          paddingRight: 10,
          gap: sd.gap,
          border: `1px solid ${colors.inputBorder}`,
          borderBottom: isOpen ? `1px solid ${colors.white}` : `1px solid ${colors.inputBorder}`,
          cursor: 'pointer',
          transition: 'border-radius 0.1s',
        }}
      >
        <span style={{ fontSize: sd.label.fontSize, fontWeight: sd.label.fontWeight, color: sd.label.color, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {`Sort: ${SORT_LABELS[sortBy]}`}
        </span>
        <ChevronDown
          size={sd.chevron.fontSize}
          style={{
            color: sd.chevron.color,
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.15s',
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: sd.height,
            right: 0,
            width: 180,
            background: colors.white,
            border: `1px solid ${colors.inputBorder}`,
            borderTop: 'none',
            borderRadius: `0 0 ${borderRadius.input}px ${borderRadius.input}px`,
            zIndex: 50,
            overflow: 'hidden',
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <DropdownOption
              key={option}
              label={SORT_LABELS[option]}
              active={sortBy === option}
              onSelect={() => handleSelect(option)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function DropdownOption({
  label,
  active,
  onSelect,
}: {
  label: string
  active: boolean
  onSelect: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '9px 12px',
        background: active ? colors.chipBg : hovered ? colors.chipBg : colors.white,
        border: 'none',
        cursor: 'pointer',
        fontSize: fontSize.small,
        fontWeight: active ? fontWeight.medium : fontWeight.regular,
        color: colors.ink,
        fontFamily: 'inherit',
        transition: 'background 0.1s',
      }}
    >
      {label}
    </button>
  )
}

// ─── Results Area ─────────────────────────────────────────────────────────────

export default function ResultsArea({ products }: { products: Product[] }) {
  const { materials, types, inStockOnly, sortBy, toggleMaterial, toggleType, toggleInStockOnly } =
    useFilterStore()

  const rt = componentTokens.resultsToolbar
  const grid = componentTokens.grid

  const sortedProducts = useMemo(() => {
    const arr = [...products]
    switch (sortBy) {
      case 'featured':
        return arr
      case 'price_asc':
        return arr.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
      case 'price_desc':
        return arr.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
      case 'name_asc':
        return arr.sort((a, b) => a.name.localeCompare(b.name))
      case 'name_desc':
        return arr.sort((a, b) => b.name.localeCompare(a.name))
      default:
        return arr
    }
  }, [products, sortBy])

  const activeChips = [
    ...materials.map((m) => ({ key: `material-${m}`, label: m, dismiss: () => toggleMaterial(m) })),
    ...types.map((t) => ({ key: `type-${t}`, label: t, dismiss: () => toggleType(t) })),
    ...(inStockOnly ? [{ key: 'instock', label: 'In Stock', dismiss: toggleInStockOnly }] : []),
  ]

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.resultsGap,
        minWidth: 0,
      }}
    >
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: rt.count.fontSize, fontWeight: rt.count.fontWeight, color: rt.count.color }}>
          {sortedProducts.length} Results
        </span>
        <SortDropdown />
      </div>

      {/* Active filter chips */}
      {activeChips.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.activeFiltersGap }}>
          {activeChips.map((chip) => (
            <FilterChip key={chip.key} label={chip.label} onDismiss={chip.dismiss} />
          ))}
        </div>
      )}

      {/* Product grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
          rowGap: grid.rowGap,
          columnGap: grid.colGap,
        }}
      >
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
