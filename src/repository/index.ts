import monthlyCalendarRepository from './monthlyCalendar.repository';
import sidebarRepository from './sidebar.repository';

export const API = {
  MONTHLY_CALENDAR: '/monthlyCalendar',
  SIDEBAR: '/sidebar',
};

const repository = {
  monthlyCalendar: monthlyCalendarRepository,
  sidebar: sidebarRepository,
};

export default repository;
