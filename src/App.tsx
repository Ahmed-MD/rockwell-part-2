import { componentTokens, spacing, fontFamily } from '@/tokens'
import FilterPanel from '@/components/FilterPanel'
import ResultsArea from '@/components/ResultsArea'
import type { Product } from '@/components/ProductCard'

const products: Product[] = [
  { id: 1,  name: 'Rockwell 6S Adjustable', material: 'Stainless Steel', type: 'Adjustable', price: '$120', inStock: true },
  { id: 2,  name: 'Rockwell 6C',            material: 'Chrome',          type: 'Fixed',      price: '$80',  inStock: true },
  { id: 3,  name: 'Rockwell T2',            material: 'Gunmetal',        type: 'Fixed',      price: '$50',  inStock: true },
  { id: 4,  name: 'Rockwell R1',            material: 'White Chrome',    type: 'Fixed',      price: '$40',  inStock: true },
  { id: 5,  name: 'Rockwell Model T',       material: 'Matte Black',     type: 'Adjustable', price: '$150', inStock: true },
  { id: 6,  name: 'Rockwell 2C',            material: 'Chrome',          type: 'Fixed',      price: '$30',  inStock: true },
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
            Precision-engineered safety razors. Filter to find your setting.
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
