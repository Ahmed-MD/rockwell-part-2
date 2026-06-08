import { componentTokens, fontWeight, colors } from '@/tokens'

export type Product = {
  id: number
  name: string
  material: string
  type: string
  price: string
  inStock: boolean
}

export default function ProductCard({ product }: { product: Product }) {
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

        <div
          style={{
            paddingTop: pc.content.footer.paddingTop,
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
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
                fontSize: 11,
                fontWeight: fontWeight.medium,
                color: colors.muted,
              }}
            >
              Out of stock
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
