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
  amount: string
  date: string
}

export const navItems: NavItem[] = [
  { icon: navOverviewIcon, label: 'Overview', to: '/overview' },
  { icon: navItemIcon, label: 'Events', to: '/events' },
  { icon: navItemIcon, label: 'EventShield', to: '/event-shield' },
  { icon: navItemIcon, label: 'Contacts', to: '/contacts' },
  { icon: navItemIcon, label: 'Promotions', to: '/promotions' },
]

export const stats: Stat[] = [
  {
    icon: coinIcon,
    label: 'Total Net Sales',
    value: '$48,250.00',
    helper: 'Across all events',
    delta: '+12.5%',
  },
  {
    icon: ticketIcon,
    label: 'Average Ticket Price',
    value: '$84.65',
    helper: 'Weighted average',
  },
  {
    icon: calendarDotsIcon,
    label: 'Total Events Organized',
    value: '3',
    helper: '2 Active, 1 Ended',
  },
]

export const registrations: Registration[] = [
  {
    customer: 'Alex Rivera',
    initials: 'AR',
    event: 'Summer Music Fest',
    tickets: 2,
    amount: '$150.00',
    date: '2 mins ago',
  },
  {
    customer: 'Sarah Jenkins',
    initials: 'SJ',
    event: 'Tech Conference 2026',
    tickets: 1,
    amount: '$120.00',
    date: '15 mins ago',
  },
  {
    customer: 'Michael Chen',
    initials: 'MC',
    event: 'Summer Music Fest',
    tickets: 4,
    amount: '$300.00',
    date: '1 hour ago',
  },
  {
    customer: 'Elena Rodriguez',
    initials: 'ER',
    event: "New Year's Gala",
    tickets: 2,
    amount: '$400.00',
    date: '3 hours ago',
  },
  {
    customer: 'David Smith',
    initials: 'DS',
    event: 'Summer Music Fest',
    tickets: 1,
    amount: '$75.00',
    date: '5 hours ago',
  },
]

export const chartMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
export const revenueSeries = [12000, 15000, 18000, 22000, 32000, 48000]
export const registrationSeries = [150, 210, 290, 360, 450, 580]

export const chartFrame = {
  width: 1065,
  height: 350,
  left: 65,
  right: 65,
  top: 5,
  bottom: 35,
}
