import { componentTokens, spacing, fontFamily } from '@/tokens'
import FilterPanel from '@/components/FilterPanel'
import ResultsArea from '@/components/ResultsArea'
import type { Product } from '@/components/ProductCard'

const products: Product[] = [
  { id: 1, name: 'Merkur 34C Heavy Duty', material: 'Chrome Plated', type: 'Safety Razor', price: '$42.99', inStock: true },
  { id: 2, name: 'Parker 99R Long Handle', material: 'Stainless Steel', type: 'Safety Razor', price: '$28.50', inStock: true },
  { id: 3, name: 'Gillette Fusion ProShield', material: 'Titanium Coated', type: 'Cartridge', price: '$19.99', inStock: false },
  { id: 4, name: 'Dovo Bismarck Classic', material: 'Carbon Steel', type: 'Straight Razor', price: '$89.00', inStock: true },
]

export default function App() {
  const page = componentTokens.page
  const header = componentTokens.header

  return (
    <div
      style={{
        minHeight: '100vh',
        background: page.background,
        padding: page.padding,
        fontFamily: fontFamily.sans,
      }}
    >
      {/* Page Header */}
      <div style={{ marginBottom: page.gap }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: header.gap }}>
          <h1
            style={{
              fontSize: header.title.fontSize,
              fontWeight: header.title.fontWeight,
              lineHeight: `${header.title.lineHeight}px`,
              color: header.title.color,
              margin: 0,
            }}
          >
            Shop Razors
          </h1>
          <p
            style={{
              fontSize: header.subtitle.fontSize,
              fontWeight: header.subtitle.fontWeight,
              lineHeight: `${header.subtitle.lineHeight}px`,
              color: header.subtitle.color,
              margin: 0,
            }}
          >
            Find the perfect razor for your grooming routine.
          </p>
        </div>
      </div>

      {/* Body: Filter Panel + Results */}
      <div
        style={{
          display: 'flex',
          gap: spacing.bodyGap,
          alignItems: 'flex-start',
        }}
      >
        <FilterPanel />
        <ResultsArea products={products} />
      </div>
    </div>
  )
}
