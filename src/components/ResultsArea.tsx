import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { useFilterStore } from '@/stores/filter-store'
import { componentTokens, colors, spacing } from '@/tokens'
import ProductCard, { type Product } from '@/components/ProductCard'

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
      <span
        style={{
          fontSize: fc.label.fontSize,
          fontWeight: fc.label.fontWeight,
          color: fc.label.color,
        }}
      >
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

// ─── Results Area ─────────────────────────────────────────────────────────────

export default function ResultsArea({ products }: { products: Product[] }) {
  const [sortHovered, setSortHovered] = useState(false)
  const { materials, types, inStockOnly, toggleMaterial, toggleType, toggleInStockOnly } =
    useFilterStore()

  const rt = componentTokens.resultsToolbar
  const sd = componentTokens.sortDropdown
  const grid = componentTokens.grid

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
        <span
          style={{
            fontSize: rt.count.fontSize,
            fontWeight: rt.count.fontWeight,
            color: rt.count.color,
          }}
        >
          {products.length} Results
        </span>

        <button
          type="button"
          onMouseEnter={() => setSortHovered(true)}
          onMouseLeave={() => setSortHovered(false)}
          style={{
            width: sd.width,
            height: sd.height,
            background: sd.background,
            borderRadius: sd.borderRadius,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 12,
            paddingRight: 10,
            gap: sd.gap,
            border: `1px solid ${colors.inputBorder}`,
            cursor: 'pointer',
            opacity: sortHovered ? 0.75 : 1,
            transition: 'opacity 0.15s',
          }}
        >
          <span
            style={{
              fontSize: sd.label.fontSize,
              fontWeight: sd.label.fontWeight,
              color: sd.label.color,
            }}
          >
            Sort by
          </span>
          <ChevronDown size={sd.chevron.fontSize} style={{ color: sd.chevron.color, flexShrink: 0 }} />
        </button>
      </div>

      {/* Active filter chips */}
      {activeChips.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: spacing.activeFiltersGap,
          }}
        >
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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
