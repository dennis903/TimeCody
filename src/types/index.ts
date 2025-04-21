export type TCalendarType = 'period' | 'routine' | 'schedule' | 'todo';

export interface IEvent {
  type: TCalendarType;
  id: string;
  title: string;
  category?: string;
  isTimeOn?: boolean;
  isRepeatOn?: boolean;
  notice?: {
    isOn: boolean;
    time: Date;
  };
  isDDayOn?: boolean;
  isLocationOn?: boolean;
  participants?: string[];
  memo?: string;
  calendarCategory?: string;
  start: string;
  end?: string;
  color?: string;
  groupId?: string;
  backgroundColor?: string;
  status?: 0 | 1 | 2;
}

export interface ICategory {
  id: number;
  title: string;
  color?: string;
}
