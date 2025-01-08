import { create } from 'zustand';

interface ICalendarModalState {
  isOpen: boolean;
  date: Date;
}

interface ICalendarModalStore {
  calendarModalState: ICalendarModalState;

  toggleCalendarModal: (isOpen: boolean) => void;
  setCalendarModalDate: (date: Date) => void;
}

const useCalendarModalStore = create<ICalendarModalStore>((set) => ({
  calendarModalState: {
    isOpen: false,
    date: new Date(),
  },

  toggleCalendarModal: (isOpen: boolean) =>
    set((state: ICalendarModalStore) => ({ calendarModalState: { ...state.calendarModalState, isOpen } })),
  setCalendarModalDate: (date: Date) =>
    set((state: ICalendarModalStore) => ({ calendarModalState: { ...state.calendarModalState, date } })),
}));

export default useCalendarModalStore;
