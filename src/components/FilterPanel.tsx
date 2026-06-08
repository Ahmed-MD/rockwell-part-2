import { useState } from 'react'
import { Search } from 'lucide-react'
import { useFilterStore } from '@/stores/filter-store'
import { componentTokens, colors, spacing } from '@/tokens'

const MATERIALS = ['Chrome', 'Gunmetal', 'White Chrome', 'Rose Gold']
const TYPES = ['Adjustable', 'Fixed']

// ─── Checkbox ────────────────────────────────────────────────────────────────

function CheckboxVisual({ checked }: { checked: boolean }) {
  const cb = componentTokens.checkbox
  return (
    <div
      style={{
        width: cb.size,
        height: cb.size,
        borderRadius: cb.borderRadius,
        border: `${cb.strokeWidth}px solid ${checked ? cb.checked.borderColor : cb.unchecked.borderColor}`,
        background: checked ? cb.checked.background : cb.unchecked.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path
            d="M1 4L3.5 6.5L9 1"
            stroke={cb.checked.checkColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  )
}

// ─── Filter Option Row ────────────────────────────────────────────────────────

function FilterOptionRow({
  label,
  checked,
  onToggle,
}: {
  label: string
  checked: boolean
  onToggle: () => void
}) {
  const fg = componentTokens.filterGroup

  return (
    <div
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
      }}
    >
      <CheckboxVisual checked={checked} />
      <span
        style={{
          fontSize: fg.option.fontSize,
          fontWeight: fg.option.fontWeight,
          color: fg.option.color,
          userSelect: 'none',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ─── Filter Group ─────────────────────────────────────────────────────────────

function FilterGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (v: string) => void
}) {
  const fg = componentTokens.filterGroup

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: fg.gap }}>
      <span
        style={{
          fontSize: fg.label.fontSize,
          fontWeight: fg.label.fontWeight,
          color: fg.label.color,
          letterSpacing: fg.label.letterSpacing,
          textTransform: fg.label.textTransform,
        }}
      >
        {label}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: fg.optionGap }}>
        {options.map((option) => (
          <FilterOptionRow
            key={option}
            label={option}
            checked={selected.includes(option)}
            onToggle={() => onToggle(option)}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  const tg = componentTokens.toggle
  const thumbTravel = tg.width - tg.padding * 2 - tg.thumbSize

  return (
    <button
      onClick={onToggle}
      type="button"
      aria-pressed={on}
      style={{
        position: 'relative',
        width: tg.width,
        height: tg.height,
        borderRadius: tg.borderRadius,
        background: on ? tg.on.background : tg.off.background,
        border: on ? '1.5px solid transparent' : `1.5px solid ${tg.off.borderColor}`,
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background 0.2s, border-color 0.2s',
        padding: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: tg.padding,
          left: tg.padding,
          width: tg.thumbSize,
          height: tg.thumbSize,
          borderRadius: '50%',
          background: on ? tg.on.thumbColor : tg.off.thumbColor,
          transform: `translateX(${on ? thumbTravel : 0}px)`,
          transition: 'transform 0.2s, background 0.2s',
        }}
      />
    </button>
  )
}

// ─── Filter Panel ─────────────────────────────────────────────────────────────

export default function FilterPanel() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [clearHovered, setClearHovered] = useState(false)

  const {
    search,
    materials,
    types,
    inStockOnly,
    setSearch,
    toggleMaterial,
    toggleType,
    toggleInStockOnly,
    clearAll,
  } = useFilterStore()

  const fp = componentTokens.filterPanel
  const si = componentTokens.searchInput
  const tg = componentTokens.toggle

  const hasActiveFilters =
    materials.length > 0 || types.length > 0 || inStockOnly || search.length > 0

  return (
    <div
      style={{
        width: fp.width,
        background: fp.background,
        borderRadius: fp.borderRadius,
        padding: fp.padding,
        display: 'flex',
        flexDirection: 'column',
        gap: fp.gap,
        flexShrink: 0,
        alignSelf: 'flex-start',
      }}
    >
      {/* Panel Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: fp.heading.fontSize,
            fontWeight: fp.heading.fontWeight,
            color: fp.heading.color,
          }}
        >
          Filters
        </span>

        <button
          onClick={clearAll}
          onMouseEnter={() => setClearHovered(true)}
          onMouseLeave={() => setClearHovered(false)}
          type="button"
          style={{
            fontSize: fp.clearAll.fontSize,
            fontWeight: fp.clearAll.fontWeight,
            color: fp.clearAll.color,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            opacity: clearHovered ? 0.6 : hasActiveFilters ? 1 : 0.4,
            transition: 'opacity 0.15s',
          }}
        >
          Clear all
        </button>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: si.paddingX,
            top: '50%',
            transform: 'translateY(-50%)',
            color: colors.muted,
            pointerEvents: 'none',
          }}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search razors"
          className="search-input"
          style={{
            width: '100%',
            background: si.background,
            border: `${si.borderWidth}px solid ${searchFocused ? colors.ink : si.borderColor}`,
            borderRadius: si.borderRadius,
            paddingTop: si.paddingY,
            paddingBottom: si.paddingY,
            paddingLeft: si.paddingX + 24,
            paddingRight: si.paddingX,
            fontSize: si.placeholder.fontSize,
            fontWeight: si.placeholder.fontWeight,
            color: colors.ink,
            outline: 'none',
            transition: 'border-color 0.15s',
            fontFamily: 'inherit',
          }}
        />
      </div>

      {/* MATERIAL group */}
      <FilterGroup
        label="MATERIAL"
        options={MATERIALS}
        selected={materials}
        onToggle={toggleMaterial}
      />

      {/* TYPE group */}
      <FilterGroup
        label="TYPE"
        options={TYPES}
        selected={types}
        onToggle={toggleType}
      />

      {/* In Stock Only toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: tg.label.fontSize,
            fontWeight: tg.label.fontWeight,
            color: tg.label.color,
          }}
        >
          In stock only
        </span>
        <Toggle on={inStockOnly} onToggle={toggleInStockOnly} />
      </div>
    </div>
  )
}
