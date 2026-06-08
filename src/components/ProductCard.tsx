import { useState } from 'react'
import { Check } from 'lucide-react'
import { componentTokens, fontWeight, colors, fontSize, borderRadius } from '@/tokens'
import { useFilterStore } from '@/stores/filter-store'

export type Product = {
  id: number
  name: string
  material: string
  type: string
  price: string
  inStock: boolean
}

export default function ProductCard({ product }: { product: Product }) {
  const [btnHovered, setBtnHovered] = useState(false)

  const { selectedIds, toggleSelected } = useFilterStore()
  const isSelected = selectedIds.includes(product.id)

  const pc = componentTokens.productCard

  return (
    <div
      style={{
        background: pc.background,
        borderRadius: pc.borderRadius,
        width: pc.width,
        height: pc.height,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image placeholder */}
      <div
        style={{
          background: pc.imageArea.background,
          height: pc.imageArea.height,
          flexShrink: 0,
        }}
      />

      {/* Content area */}
      <div
        style={{
          padding: pc.content.padding,
          display: 'flex',
          flexDirection: 'column',
          gap: pc.content.gap,
          flex: 1,
        }}
      >
        <span
          style={{
            fontSize: pc.content.name.fontSize,
            fontWeight: pc.content.name.fontWeight,
            color: pc.content.name.color,
            lineHeight: '1.3',
          }}
        >
          {product.name}
        </span>

        <span
          style={{
            fontSize: pc.content.material.fontSize,
            fontWeight: pc.content.material.fontWeight,
            color: pc.content.material.color,
          }}
        >
          {product.material}
        </span>

        {/* Footer: price + select button */}
        <div
          style={{
            paddingTop: pc.content.footer.paddingTop,
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span
              style={{
                fontSize: pc.content.name.fontSize,
                fontWeight: fontWeight.semiBold,
                color: colors.ink,
              }}
            >
              {product.price}
            </span>
            {!product.inStock && (
              <span
                style={{
                  fontSize: fontSize.xs,
                  fontWeight: fontWeight.medium,
                  color: colors.muted,
                }}
              >
                Out of stock
              </span>
            )}
          </div>

          <button
            onClick={() => { toggleSelected(product.id); setBtnHovered(false) }}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              height: 30,
              paddingLeft: 14,
              paddingRight: 14,
              borderRadius: borderRadius.input,
              border: `1px solid ${isSelected ? 'transparent' : colors.inputBorder}`,
              background: isSelected
                ? colors.ink
                : btnHovered
                ? colors.ink
                : colors.white,
              color: isSelected || btnHovered ? colors.white : colors.ink,
              fontSize: fontSize.small,
              fontWeight: fontWeight.medium,
              cursor: 'pointer',
              transition: 'background 0.15s, color 0.15s, border-color 0.15s',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
            }}
          >
            {isSelected && <Check size={12} strokeWidth={2.5} style={{ flexShrink: 0 }} />}
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  )
}
