// Design System Constants - Based on Figma Content Management Design System

// COLORS
export const colors = {
  // Primary
  background: '#121214',
  cardBg: '#232326',
  accent: '#feff1c',
  accentDark: '#e5e60d',
  
  // Text
  textPrimary: '#f8f9fa',
  textSecondary: '#9caab8',
  textTertiary: '#767686',
  
  // Borders
  borderPrimary: '#424249',
  borderSecondary: '#323239',
  
  // Status Colors
  success: '#20CC70',
  error: '#FF4D4D',
  warning: '#FFDB43',
  info: '#3B82F6',
  purple: '#A855F7',
} as const;

// TYPOGRAPHY
export const typography = {
  heading: "font-['Kamerik205:Regular_3',sans-serif]",
  body: "font-['Inter:Regular',sans-serif]",
  
  // Font Sizes
  h1: 'text-[32px] leading-[41.6px]',
  h2: 'text-[24px] leading-[31px]',
  h3: 'text-[20px] leading-[26px]',
  h4: 'text-[18px] leading-[23.4px]',
  body: 'text-[14px] leading-[18.2px]',
  small: 'text-[12px] leading-[15.6px]',
  tiny: 'text-[11px] leading-[14.3px]',
} as const;

// SPACING
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
} as const;

// BORDER RADIUS
export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '999px',
} as const;

// COMPONENT CLASSES - Reusable styled components

// Buttons
export const buttonClasses = {
  // Primary Button (Yellow)
  primary: `
    bg-[${colors.accent}] 
    text-[${colors.background}] 
    px-[16px] py-[12px] 
    rounded-[${radius.md}] 
    font-['Kamerik205:Regular_3',sans-serif]
    text-[14px] leading-[18.2px]
    font-normal
    hover:opacity-90 
    disabled:opacity-50 
    disabled:cursor-not-allowed
    transition-all
  `.replace(/\s+/g, ' ').trim(),
  
  // Secondary Button (Dark)
  secondary: `
    bg-[${colors.cardBg}] 
    text-[${colors.textPrimary}] 
    px-[16px] py-[12px] 
    rounded-[${radius.md}]
    border border-[${colors.borderPrimary}]
    font-['Kamerik205:Regular_3',sans-serif]
    text-[14px] leading-[18.2px]
    font-normal
    hover:border-[${colors.accent}]
    transition-all
  `.replace(/\s+/g, ' ').trim(),
  
  // Ghost Button
  ghost: `
    bg-transparent
    text-[${colors.textPrimary}] 
    px-[16px] py-[12px] 
    rounded-[${radius.md}]
    font-['Kamerik205:Regular_3',sans-serif]
    text-[14px] leading-[18.2px]
    font-normal
    hover:bg-[${colors.cardBg}]
    transition-all
  `.replace(/\s+/g, ' ').trim(),
} as const;

// Input Fields
export const inputClasses = {
  base: `
    w-full 
    px-[16px] py-[12px] 
    bg-[${colors.background}] 
    rounded-[${radius.md}] 
    text-[${colors.textPrimary}] 
    font-['Inter:Regular',sans-serif]
    text-[14px] leading-[18.2px]
    placeholder:text-[${colors.textTertiary}]
    border border-[${colors.borderPrimary}]
    focus:outline-none 
    focus:ring-1 
    focus:ring-[${colors.accent}]
    transition-all
  `.replace(/\s+/g, ' ').trim(),
  
  error: `
    ring-2 
    ring-red-500 
    border-red-500
  `.replace(/\s+/g, ' ').trim(),
  
  success: `
    ring-1 
    ring-green-500 
    border-green-500
  `.replace(/\s+/g, ' ').trim(),
} as const;

// Cards
export const cardClasses = {
  base: `
    bg-[${colors.cardBg}] 
    rounded-[${radius.md}] 
    p-[${spacing.xl}]
    relative
  `.replace(/\s+/g, ' ').trim(),
  
  withBorder: `
    bg-[${colors.cardBg}] 
    rounded-[${radius.md}] 
    p-[${spacing.xl}]
    border border-[${colors.borderPrimary}]
    relative
  `.replace(/\s+/g, ' ').trim(),
} as const;

// Stats Cards (from Figma)
export const statsCardClasses = {
  container: `
    bg-[${colors.cardBg}] 
    flex-[1_0_0] 
    min-h-px 
    min-w-[158px] 
    relative 
    rounded-[${radius.md}]
  `.replace(/\s+/g, ' ').trim(),
  
  content: `
    content-stretch 
    flex 
    flex-col 
    gap-[${spacing.sm}] 
    items-start 
    min-w-[inherit] 
    not-italic 
    p-[${spacing.xl}] 
    relative 
    text-[${colors.textPrimary}] 
    w-full
  `.replace(/\s+/g, ' ').trim(),
  
  label: `
    font-['Inter:Regular',sans-serif] 
    font-normal 
    leading-[18.2px] 
    relative 
    shrink-0 
    text-[14px] 
    w-full
  `.replace(/\s+/g, ' ').trim(),
  
  value: `
    font-['Kamerik205:Regular_3',sans-serif] 
    leading-[31px] 
    relative 
    shrink-0 
    text-[24px] 
    w-full
  `.replace(/\s+/g, ' ').trim(),
} as const;

// Labels
export const labelClasses = {
  base: `
    font-['Inter:Regular',sans-serif]
    font-bold 
    text-[12px] 
    leading-[15.6px] 
    text-[${colors.textSecondary}] 
    uppercase 
    tracking-wider 
    block 
    mb-2
  `.replace(/\s+/g, ' ').trim(),
} as const;

// Helper Text
export const helperTextClasses = {
  base: `
    font-['Inter:Regular',sans-serif]
    text-[11px] 
    leading-[14.3px] 
    text-[${colors.textTertiary}] 
    mt-1
  `.replace(/\s+/g, ' ').trim(),
  
  error: `
    font-['Inter:Regular',sans-serif]
    text-[12px] 
    leading-[15.6px] 
    text-red-500 
    mt-1 
    flex 
    items-center 
    gap-1
  `.replace(/\s+/g, ' ').trim(),
} as const;

// Validation Icons Container
export const validationIconClasses = `
  absolute 
  right-[12px] 
  top-1/2 
  -translate-y-1/2
`.replace(/\s+/g, ' ').trim();

// Tabs
export const tabClasses = {
  container: `
    relative 
    shrink-0 
    w-full
  `.replace(/\s+/g, ' ').trim(),
  
  list: `
    bg-clip-padding 
    border-0 
    border-[transparent] 
    border-solid 
    content-stretch 
    flex 
    items-start 
    relative 
    w-full
  `.replace(/\s+/g, ' ').trim(),
  
  tab: `
    content-stretch 
    flex 
    items-center 
    justify-center 
    px-[8px] 
    py-[16px] 
    relative 
    shrink-0 
    cursor-pointer 
    flex-1
  `.replace(/\s+/g, ' ').trim(),
  
  tabText: `
    flex 
    flex-col 
    font-['Kamerik205:Regular_3',sans-serif] 
    justify-center 
    leading-[0] 
    not-italic 
    relative 
    shrink-0 
    text-[16px] 
    whitespace-nowrap
  `.replace(/\s+/g, ' ').trim(),
  
  activeIndicator: `
    absolute 
    border-[${colors.accent}] 
    border-b-2 
    border-solid 
    inset-0 
    pointer-events-none
  `.replace(/\s+/g, ' ').trim(),
  
  borderBottom: `
    absolute 
    border-[${colors.borderPrimary}] 
    border-b 
    border-solid 
    inset-0 
    pointer-events-none
  `.replace(/\s+/g, ' ').trim(),
} as const;

// Table (Flex-based Div Layout from Figma)
export const tableClasses = {
  container: `
    bg-[${colors.background}] 
    rounded-[${radius.md}] 
    relative 
    w-full
  `.replace(/\s+/g, ' ').trim(),
  
  header: `
    bg-[${colors.cardBg}] 
    relative 
    shrink-0 
    w-full 
    rounded-t-[${radius.md}]
  `.replace(/\s+/g, ' ').trim(),
  
  headerRow: `
    bg-clip-padding 
    border-0 
    border-[transparent] 
    border-solid 
    content-stretch 
    flex 
    items-center 
    relative 
    w-full
  `.replace(/\s+/g, ' ').trim(),
  
  headerCell: `
    content-stretch 
    flex 
    gap-[4px] 
    items-center 
    p-[12px] 
    relative
  `.replace(/\s+/g, ' ').trim(),
  
  row: `
    relative 
    shrink-0 
    w-full
  `.replace(/\s+/g, ' ').trim(),
  
  rowContent: `
    bg-clip-padding 
    border-0 
    border-[transparent] 
    border-solid 
    content-stretch 
    flex 
    items-center 
    relative 
    w-full
  `.replace(/\s+/g, ' ').trim(),
  
  cell: `
    content-stretch 
    flex 
    flex-col 
    items-start 
    px-[12px] 
    py-[8px] 
    relative
  `.replace(/\s+/g, ' ').trim(),
  
  cellText: `
    flex 
    flex-col 
    font-['Inter:Regular',sans-serif] 
    font-normal 
    justify-center 
    leading-[0] 
    not-italic 
    relative 
    shrink-0 
    text-[${colors.textPrimary}] 
    text-[14px]
  `.replace(/\s+/g, ' ').trim(),
  
  borderTop: `
    absolute 
    border-[${colors.borderPrimary}] 
    border-solid 
    border-t 
    inset-0 
    pointer-events-none
  `.replace(/\s+/g, ' ').trim(),
} as const;

// Utility Functions
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Border Overlay (for Figma-style bordered elements)
export const BorderOverlay = ({ radius = 'md' }: { radius?: keyof typeof radius }) => (
  <div 
    aria-hidden="true" 
    className={`absolute border-[${colors.borderPrimary}] border border-solid inset-0 pointer-events-none rounded-[${radius === 'md' ? '8px' : radius === 'lg' ? '12px' : '8px'}]`}
  />
);
