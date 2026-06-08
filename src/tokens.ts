// Design tokens extracted from Figma — "Razor Catalog + Filters"
// All values are exact from Figma REST API (no guesses)

// ---------------------------------------------------------------------------
// COLORS
// Raw Figma RGB → hex (multiplied by 255, rounded)
// ---------------------------------------------------------------------------

export const colors = {
  // Primary text / interactive dark elements
  // Figma: r:0.102 g:0.102 b:0.102  →  rgb(26,26,26)
  ink: "#1a1a1a",

  // Secondary / muted text, placeholders, icons, labels
  // Figma: r:0.420 g:0.447 b:0.502  →  rgb(107,114,128)
  muted: "#6b7280",

  // Surfaces
  white: "#ffffff",

  // Page/canvas background
  // Figma: r:0.961 g:0.961 b:0.957  →  rgb(245,245,244)
  pageBg: "#f5f5f4",

  // Search input background
  // Figma: r:0.976 g:0.976 b:0.973  →  rgb(249,249,248)
  inputBg: "#f9f9f8",

  // Search input border / stroke
  // Figma: r:0.898 g:0.898 b:0.898  →  rgb(229,229,229)
  inputBorder: "#e5e5e5",

  // Filter chip background (active filter pills)
  // Figma: r:0.937 g:0.937 b:0.933  →  rgb(239,239,238)
  chipBg: "#efefee",

  // Card image placeholder background
  // Figma: r:0.925 g:0.925 b:0.922  →  rgb(236,236,235)
  imagePlaceholder: "#ececeb",
} as const;

export type ColorToken = keyof typeof colors;

// ---------------------------------------------------------------------------
// TYPOGRAPHY
// Font family: Inter (all text in the design)
// ---------------------------------------------------------------------------

export const fontFamily = {
  sans: "Inter, sans-serif",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semiBold: 600,
} as const;

export const fontSize = {
  // Page-level heading "Shop Razors"
  pageTitle: 22,

  // Page subtitle / description text
  pageSubtitle: 14,

  // Filter panel section heading "Filters"
  panelHeading: 16,

  // Card product name / results count
  cardTitle: 15,

  // Filter option labels / search placeholder / toggle label
  body: 14,

  // "Clear all" / sort label / card material / chip label
  small: 13,

  // Filter group uppercase labels (MATERIAL, TYPE)
  label: 12,

  // Dismiss icon in chips / checkbox checkmark
  xs: 11,
} as const;

export const lineHeight = {
  // "Shop Razors" heading
  pageTitle: 28,

  // Page subtitle
  pageSubtitle: 20,

  // All other text uses intrinsic (font-native) line height
} as const;

export const letterSpacing = {
  // Filter group labels (MATERIAL, TYPE) — uppercase + spaced
  // Figma value: 0.72px
  labelTracking: "0.72px",

  // All other text
  none: "0px",
} as const;

// ---------------------------------------------------------------------------
// SPACING
// All values in pixels (px). Use as numbers or with a px suffix.
// ---------------------------------------------------------------------------

export const spacing = {
  // Canvas / page outer padding (32px all sides)
  pagePadding: 32,

  // Gap: Header → Body
  pageGap: 24,

  // Header: gap between title and subtitle
  headerGap: 6,

  // Gap: Filter Panel ↔ Results
  bodyGap: 32,

  // Filter panel inner padding (all sides)
  panelPadding: 20,

  // Gap between filter panel sections (PanelHeader / Search / Groups / Toggle)
  panelGap: 24,

  // Gap between filter group label and its options list
  filterGroupGap: 12,

  // Gap between individual checkbox options in a group
  filterOptionGap: 12,

  // Search input: vertical padding (top/bottom)
  inputPaddingY: 10,

  // Search input: horizontal padding (left/right)
  inputPaddingX: 12,

  // Results area gap (toolbar / active-filters / grid)
  resultsGap: 16,

  // Gap between grid rows
  gridRowGap: 16,

  // Gap between cards within a row
  gridColGap: 16,

  // Card content: inner padding (all sides)
  cardPadding: 14,

  // Card content: gap between name / material / footer rows
  cardContentGap: 6,

  // Card footer: padding-top only
  cardFooterPaddingTop: 4,

  // Filter chip: gap between label and dismiss icon
  chipGap: 6,

  // Active filters row: gap between chips
  activeFiltersGap: 8,

  // Sort dropdown: gap between label and chevron icon
  sortDropdownGap: 8,

  // Toggle switch: inner padding (thumb offset, all sides)
  togglePadding: 2,
} as const;

export type SpacingToken = keyof typeof spacing;

// ---------------------------------------------------------------------------
// BORDER RADIUS
// ---------------------------------------------------------------------------

export const borderRadius = {
  // Filter panel card, product card
  card: 12,

  // Search input, sort dropdown
  input: 8,

  // Checkbox
  checkbox: 4,

  // Filter chips, toggle switch (pill shape)
  pill: 999,

  none: 0,
} as const;

export type RadiusToken = keyof typeof borderRadius;

// ---------------------------------------------------------------------------
// DIMENSIONS
// Fixed sizes extracted directly from Figma layout
// ---------------------------------------------------------------------------

export const dimensions = {
  canvas: { width: 1120, height: 1046 },

  filterPanel: { width: 280 },

  resultsPanel: { width: 744 },

  productCard: { width: 364, height: 260 },
  cardImageArea: { width: 364, height: 150 },
  cardContentArea: { width: 364, height: 110 },

  // Checkbox control (square)
  checkbox: { size: 18 },
  checkboxStrokeWidth: 1.5,

  // Toggle switch
  toggle: { width: 38, height: 22 },
  toggleThumb: { size: 16 },

  // Sort dropdown button
  sortDropdown: { width: 126, height: 32 },
} as const;

// ---------------------------------------------------------------------------
// COMPONENT TOKENS
// Per-component design values assembled from the primitives above.
// These are the exact values you should apply when building each component.
// ---------------------------------------------------------------------------

export const componentTokens = {
  page: {
    background: colors.pageBg,
    padding: spacing.pagePadding,
    gap: spacing.pageGap,
  },

  header: {
    gap: spacing.headerGap,
    title: {
      fontSize: fontSize.pageTitle,
      fontWeight: fontWeight.semiBold,
      lineHeight: lineHeight.pageTitle,
      color: colors.ink,
    },
    subtitle: {
      fontSize: fontSize.pageSubtitle,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight.pageSubtitle,
      color: colors.muted,
    },
  },

  filterPanel: {
    background: colors.white,
    borderRadius: borderRadius.card,
    padding: spacing.panelPadding,
    gap: spacing.panelGap,
    width: dimensions.filterPanel.width,

    heading: {
      fontSize: fontSize.panelHeading,
      fontWeight: fontWeight.semiBold,
      color: colors.ink,
    },
    clearAll: {
      fontSize: fontSize.small,
      fontWeight: fontWeight.medium,
      color: colors.muted,
    },
  },

  searchInput: {
    background: colors.inputBg,
    borderColor: colors.inputBorder,
    borderWidth: 1,
    borderRadius: borderRadius.input,
    paddingY: spacing.inputPaddingY,
    paddingX: spacing.inputPaddingX,
    placeholder: {
      fontSize: fontSize.body,
      fontWeight: fontWeight.regular,
      color: colors.muted,
    },
  },

  filterGroup: {
    gap: spacing.filterGroupGap,
    label: {
      fontSize: fontSize.label,
      fontWeight: fontWeight.semiBold,
      color: colors.muted,
      letterSpacing: letterSpacing.labelTracking,
      textTransform: "uppercase" as const,
    },
    optionGap: spacing.filterOptionGap,
    option: {
      fontSize: fontSize.body,
      fontWeight: fontWeight.regular,
      color: colors.ink,
    },
  },

  checkbox: {
    size: dimensions.checkbox.size,
    borderRadius: borderRadius.checkbox,
    strokeWidth: dimensions.checkboxStrokeWidth,
    checked: {
      background: colors.ink,
      borderColor: colors.ink,
      checkColor: colors.white,
    },
    unchecked: {
      background: colors.white,
      borderColor: colors.inputBorder,
    },
  },

  toggle: {
    width: dimensions.toggle.width,
    height: dimensions.toggle.height,
    borderRadius: borderRadius.pill,
    padding: spacing.togglePadding,
    thumbSize: dimensions.toggleThumb.size,
    on: {
      background: colors.ink,
      thumbColor: colors.white,
    },
    off: {
      background: colors.white,
      borderColor: colors.inputBorder,
      thumbColor: colors.ink,
    },
    label: {
      fontSize: fontSize.body,
      fontWeight: fontWeight.regular,
      color: colors.ink,
    },
  },

  filterChip: {
    background: colors.chipBg,
    borderRadius: borderRadius.pill,
    gap: spacing.chipGap,
    label: {
      fontSize: fontSize.small,
      fontWeight: fontWeight.medium,
      color: colors.ink,
    },
    dismiss: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.regular,
      color: colors.muted,
    },
  },

  resultsToolbar: {
    count: {
      fontSize: fontSize.cardTitle,
      fontWeight: fontWeight.semiBold,
      color: colors.ink,
    },
  },

  sortDropdown: {
    background: colors.white,
    borderRadius: borderRadius.input,
    gap: spacing.sortDropdownGap,
    width: dimensions.sortDropdown.width,
    height: dimensions.sortDropdown.height,
    label: {
      fontSize: fontSize.small,
      fontWeight: fontWeight.medium,
      color: colors.ink,
    },
    chevron: {
      fontSize: fontSize.label,
      fontWeight: fontWeight.regular,
      color: colors.muted,
    },
  },

  productCard: {
    background: colors.white,
    borderRadius: borderRadius.card,
    width: dimensions.productCard.width,
    height: dimensions.productCard.height,

    imageArea: {
      background: colors.imagePlaceholder,
      height: dimensions.cardImageArea.height,
    },
    content: {
      padding: spacing.cardPadding,
      gap: spacing.cardContentGap,
      name: {
        fontSize: fontSize.cardTitle,
        fontWeight: fontWeight.semiBold,
        color: colors.ink,
      },
      material: {
        fontSize: fontSize.small,
        fontWeight: fontWeight.regular,
        color: colors.muted,
      },
      footer: {
        paddingTop: spacing.cardFooterPaddingTop,
      },
    },
  },

  grid: {
    rowGap: spacing.gridRowGap,
    colGap: spacing.gridColGap,
    columns: 2,
  },
} as const;
