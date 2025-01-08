import monthlyCalendarRepository from './monthlyCalendar.repository';
import SidebarRepository from './sidebar.repository';

export const API = {
  MONTHLY_CALENDAR: '/monthlyCalendar',
  SIDEBAR: '/sidebar',
};

const repository = {
  monthlyCalendar: monthlyCalendarRepository,
  sidebar: SidebarRepository,
};

export default repository;
