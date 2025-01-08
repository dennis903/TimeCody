import monthlyCalendarRepository from './monthlyCalendar.repository';

export const API = {
  MONTHLY_CALENDAR: '/monthlyCalendar',
};

const repository = {
  monthlyCalendar: monthlyCalendarRepository,
};

export default repository;
