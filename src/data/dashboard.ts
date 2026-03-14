import {
  calendarDotsIcon,
  coinIcon,
  navItemIcon,
  navOverviewIcon,
  ticketIcon,
} from '../assets/figma'

export type NavItem = {
  icon: string
  label: string
  to: string
}

export type OverviewRange = 'Lifetime' | 'Last 30 Days' | 'Last 90 Days' | 'This Year'

export type PerformancePoint = {
  month: string
  revenue: number
  registrations: number
}

export type Stat = {
  icon: string
  label: string
  value: string
  helper: string
  delta?: string
}

export type Registration = {
  customer: string
  initials: string
  event: string
  tickets: number
  amount: number
  amountLabel: string
  date: string
  eventId: string
  tab: string
  contactEmail: string
}

export const navItems: NavItem[] = [
  { icon: navOverviewIcon, label: 'Overview', to: '/overview' },
  { icon: navItemIcon, label: 'Events', to: '/events' },
  { icon: navItemIcon, label: 'EventShield', to: '/event-shield' },
  { icon: navItemIcon, label: 'Contacts', to: '/contacts' },
  { icon: navItemIcon, label: 'Promotions', to: '/promotions' },
]

export const overviewSeries: Record<OverviewRange, PerformancePoint[]> = {
  Lifetime: [
    { month: 'Jan', revenue: 12000, registrations: 150 },
    { month: 'Feb', revenue: 15000, registrations: 200 },
    { month: 'Mar', revenue: 18000, registrations: 280 },
    { month: 'Apr', revenue: 22000, registrations: 350 },
    { month: 'May', revenue: 31000, registrations: 420 },
    { month: 'Jun', revenue: 48250, registrations: 570 },
    { month: 'Jul', revenue: 52000, registrations: 620 },
    { month: 'Aug', revenue: 58000, registrations: 710 },
    { month: 'Sep', revenue: 61000, registrations: 780 },
    { month: 'Oct', revenue: 68000, registrations: 850 },
    { month: 'Nov', revenue: 75000, registrations: 920 },
    { month: 'Dec', revenue: 82000, registrations: 1050 },
  ],
  'Last 30 Days': [
    { month: 'Sep', revenue: 61000, registrations: 780 },
    { month: 'Oct', revenue: 68000, registrations: 850 },
    { month: 'Nov', revenue: 75000, registrations: 920 },
    { month: 'Dec', revenue: 82000, registrations: 1050 },
  ],
  'Last 90 Days': [
    { month: 'Oct', revenue: 68000, registrations: 850 },
    { month: 'Nov', revenue: 75000, registrations: 920 },
    { month: 'Dec', revenue: 82000, registrations: 1050 },
  ],
  'This Year': [
    { month: 'Jan', revenue: 12000, registrations: 150 },
    { month: 'Feb', revenue: 15000, registrations: 200 },
    { month: 'Mar', revenue: 18000, registrations: 280 },
    { month: 'Apr', revenue: 22000, registrations: 350 },
    { month: 'May', revenue: 31000, registrations: 420 },
    { month: 'Jun', revenue: 48250, registrations: 570 },
    { month: 'Jul', revenue: 52000, registrations: 620 },
    { month: 'Aug', revenue: 58000, registrations: 710 },
  ],
}

export const overviewStats: Record<OverviewRange, Stat[]> = {
  Lifetime: [
    {
      icon: coinIcon,
      label: 'Total Net Sales',
      value: 'GH₵289,500.00',
      helper: 'Across all events',
      delta: '+19.5%',
    },
    {
      icon: ticketIcon,
      label: 'Average Ticket Price',
      value: 'GH₵508.00',
      helper: 'Weighted average',
    },
    {
      icon: calendarDotsIcon,
      label: 'Total Events Organized',
      value: '3',
      helper: '2 Active, 1 Ended',
    },
  ],
  'Last 30 Days': [
    {
      icon: coinIcon,
      label: 'Total Net Sales',
      value: 'GH₵82,000.00',
      helper: 'Across 1 active month',
      delta: '+8.4%',
    },
    {
      icon: ticketIcon,
      label: 'Average Ticket Price',
      value: 'GH₵536.00',
      helper: 'Weighted average',
    },
    {
      icon: calendarDotsIcon,
      label: 'Total Events Organized',
      value: '3',
      helper: '2 Active, 1 Ended',
    },
  ],
  'Last 90 Days': [
    {
      icon: coinIcon,
      label: 'Total Net Sales',
      value: 'GH₵225,000.00',
      helper: 'Across last 90 days',
      delta: '+16.1%',
    },
    {
      icon: ticketIcon,
      label: 'Average Ticket Price',
      value: 'GH₵518.00',
      helper: 'Weighted average',
    },
    {
      icon: calendarDotsIcon,
      label: 'Total Events Organized',
      value: '3',
      helper: '2 Active, 1 Ended',
    },
  ],
  'This Year': [
    {
      icon: coinIcon,
      label: 'Total Net Sales',
      value: 'GH₵174,250.00',
      helper: 'Across 3 active quarters',
      delta: '+12.5%',
    },
    {
      icon: ticketIcon,
      label: 'Average Ticket Price',
      value: 'GH₵496.00',
      helper: 'Weighted average',
    },
    {
      icon: calendarDotsIcon,
      label: 'Total Events Organized',
      value: '3',
      helper: '2 Active, 1 Ended',
    },
  ],
}

export const registrations: Registration[] = [
  {
    customer: 'Kwame Asante',
    initials: 'KA',
    event: 'Afrochella 2026',
    tickets: 2,
    amount: 1200,
    amountLabel: 'GH₵1,200.00',
    date: '2 mins ago',
    eventId: 'afrochella-2026',
    tab: 'orders',
    contactEmail: 'kwame.asante@gmail.com',
  },
  {
    customer: 'Ama Mensah',
    initials: 'AM',
    event: 'Ghana Music Awards 2026',
    tickets: 1,
    amount: 600,
    amountLabel: 'GH₵600.00',
    date: '15 mins ago',
    eventId: 'ghana-tech-summit-2026',
    tab: 'guestlist',
    contactEmail: 'ama.mensah@yahoo.com',
  },
  {
    customer: 'Kofi Osei',
    initials: 'KO',
    event: 'Afrochella 2026',
    tickets: 4,
    amount: 1800,
    amountLabel: 'GH₵1,800.00',
    date: '28 mins ago',
    eventId: 'afrochella-2026',
    tab: 'orders',
    contactEmail: 'kofi.osei@outlook.com',
  },
  {
    customer: 'Akosua Boateng',
    initials: 'AB',
    event: 'Detty December Concert',
    tickets: 2,
    amount: 2400,
    amountLabel: 'GH₵2,400.00',
    date: '1 hour ago',
    eventId: 'detty-december-concert',
    tab: 'overview',
    contactEmail: 'akosua.b@gmail.com',
  },
  {
    customer: 'Yaw Adjei',
    initials: 'YA',
    event: 'Afrochella 2026',
    tickets: 1,
    amount: 450,
    amountLabel: 'GH₵450.00',
    date: '3 hours ago',
    eventId: 'afrochella-2026',
    tab: 'attendees',
    contactEmail: 'yaw.adjei@yahoo.com',
  },
]

export const chartFrame = {
  width: 1065,
  height: 350,
  left: 92,
  right: 72,
  top: 12,
  bottom: 35,
}
