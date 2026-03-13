import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function Svg(props: IconProps) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    />
  )
}

export function MenuPanelIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="6" fill="#F8F9FA" />
      <path
        d="M17 10H23M17 16H23M17 22H21M17 28H19"
        stroke="#121214"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export function OverviewGridIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </Svg>
  )
}

export function CalendarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M8 3V8M16 3V8M4 10H20" />
    </Svg>
  )
}

export function UsersIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M16 19v-1.5A3.5 3.5 0 0 0 12.5 14h-5A3.5 3.5 0 0 0 4 17.5V19" />
      <circle cx="10" cy="8.5" r="3.5" />
      <path d="M20 18.5V17a3 3 0 0 0-2.4-2.94M15.5 5.2A3.5 3.5 0 0 1 15.5 12" />
    </Svg>
  )
}

export function TrendIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 15l5-5 3 3 6-6" />
      <path d="M14 7h5v5" />
    </Svg>
  )
}

export function CardIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="M3.5 10H20.5M7 15h4" />
    </Svg>
  )
}

export function SettingsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8v2.1M12 19.1v2.1M21.2 12h-2.1M4.9 12H2.8M18.6 5.4l-1.5 1.5M6.9 17.1l-1.5 1.5M18.6 18.6l-1.5-1.5M6.9 6.9 5.4 5.4" />
    </Svg>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </Svg>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  )
}

export function FilterIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 6h16l-6.5 7.5V19l-3 1.5v-7L4 6Z" />
    </Svg>
  )
}

export function GridViewIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </Svg>
  )
}

export function ListViewIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
    </Svg>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  )
}

export function ShareIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="m8.3 10.8 7.4-4.1M8.3 13.2l7.4 4.1" />
    </Svg>
  )
}

export function UserPlusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3.5 19v-1A4.5 4.5 0 0 1 8 13.5h2A4.5 4.5 0 0 1 14.5 18v1M18 8v6M15 11h6" />
    </Svg>
  )
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M15 18l-6-6 6-6M9 12h10" />
    </Svg>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m9 6 6 6-6 6M5 12h10" />
    </Svg>
  )
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m14 6-6 6 6 6" />
    </Svg>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m10 6 6 6-6 6" />
    </Svg>
  )
}

export function SortArrowsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M8.5 8.5 12 5l3.5 3.5M8.5 15.5 12 19l3.5-3.5" />
    </Svg>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  )
}

export function ChevronsLeftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m15 6-6 6 6 6M9 6 3 12l6 6" />
    </Svg>
  )
}

export function ChevronsRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m9 6 6 6-6 6M15 6l6 6-6 6" />
    </Svg>
  )
}

export function MapPinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 20s6-4.8 6-10a6 6 0 1 0-12 0c0 5.2 6 10 6 10Z" />
      <circle cx="12" cy="10" r="2" />
    </Svg>
  )
}

export function DotMenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function EyeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.8" />
    </Svg>
  )
}

export function DollarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4v16" />
      <path d="M15.7 7.3c-.8-.8-2.2-1.3-3.7-1.3-2.3 0-4 1.1-4 2.8s1.4 2.5 4 3.1c2.6.6 4 1.4 4 3.1s-1.7 2.9-4 2.9c-1.8 0-3.3-.6-4.3-1.7" />
    </Svg>
  )
}

export function TicketIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 8.5A2.5 2.5 0 0 0 6.5 6H18a2 2 0 0 1 2 2v3a2.5 2.5 0 0 0 0 5v3a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 0 4 18.5v-10Z" />
      <path d="M12 7v10" />
    </Svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m5 12 4.5 4.5L19 7" />
    </Svg>
  )
}

export function PencilIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m4 20 4.5-1 9-9a2.1 2.1 0 0 0-3-3l-9 9L4 20Z" />
      <path d="m13 6 4 4" />
    </Svg>
  )
}

export function TrashIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 7h14M9 7V4h6v3M7 7l1 12h8l1-12" />
    </Svg>
  )
}

export function DownloadIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4v10M8 10l4 4 4-4M5 19h14" />
    </Svg>
  )
}

export function UploadIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 20V8" />
      <path d="m7.5 12.5 4.5-4.5 4.5 4.5" />
      <path d="M5 20h14" />
    </Svg>
  )
}

export function DocumentIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 3.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 7 19V5a1.5 1.5 0 0 1 1-1.5Z" />
      <path d="M14 3.5V8h4M10 12h4M10 15.5h4" />
    </Svg>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m5 8 7 5 7-5" />
    </Svg>
  )
}

export function RefreshIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 6v5h-5M4 18v-5h5" />
      <path d="M18 11a7 7 0 0 0-12.1-2M6 13a7 7 0 0 0 12.1 2" />
    </Svg>
  )
}

export function PaperPlaneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m21 3-9.5 18-2.5-7L2 11l19-8Z" />
    </Svg>
  )
}

export function BanIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="m7 7 10 10" />
    </Svg>
  )
}

export function QrIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM17 17h3v3h-3z" />
    </Svg>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.8 2.2" />
    </Svg>
  )
}

export function ImageIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="m20 16-5-5-4.5 4.5-2-2L4 18" />
    </Svg>
  )
}

export function TypeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 6h12M12 6v12M9 18h6" />
    </Svg>
  )
}

export function GlobeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M4.5 9h15M4.5 15h15M12 4a13 13 0 0 1 0 16M12 4a13 13 0 0 0 0 16" />
    </Svg>
  )
}

export function SaveIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 5h11l3 3v11H5V5Z" />
      <path d="M8 5v5h7V5M8 19v-5h8v5" />
    </Svg>
  )
}

export function LinkIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10 14l4-4M8 16H6a4 4 0 1 1 0-8h2M16 8h2a4 4 0 1 1 0 8h-2" />
    </Svg>
  )
}

export function TagIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4h6a2 2 0 0 1 2 2v6l-8 8-8-8V6a2 2 0 0 1 2-2h6Z" />
      <circle cx="16.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function AlertIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4.5 20 19H4l8-14.5Z" />
      <path d="M12 10v4M12 17h.01" />
    </Svg>
  )
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 19 6v6.5c0 4.2-2.9 6.9-7 8-4.1-1.1-7-3.8-7-8V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  )
}

export function XIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Svg>
  )
}

export function InfoIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 10v5M12 7h.01" />
    </Svg>
  )
}

export function WalletIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1H6a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1" />
      <rect x="13" y="10" width="7" height="6" rx="1.5" />
      <circle cx="16" cy="13" r="0.8" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function StoreIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 9.5 5.5 5h13L20 9.5" />
      <path d="M5 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />
      <path d="M6 11.5v7h12v-7" />
      <path d="M9 18.5v-4h6v4" />
    </Svg>
  )
}

export function PackageIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 3.8 7 3.5v9.4l-7 3.5-7-3.5V7.3l7-3.5Z" />
      <path d="m12 3.8 7 3.5-7 3.5-7-3.5" />
      <path d="M12 10.8v9.4" />
    </Svg>
  )
}

export function LayersIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </Svg>
  )
}

export function MegaphoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 11v2a2 2 0 0 0 2 2h1l2 4h2l-1.2-4H12l6 3V6l-6 3H6a2 2 0 0 0-2 2Z" />
      <path d="M19 9.5a3.5 3.5 0 0 1 0 5" />
    </Svg>
  )
}

export function CopyIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="9" y="9" width="10" height="10" rx="2" />
      <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1" />
    </Svg>
  )
}
