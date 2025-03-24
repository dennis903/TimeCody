import { create } from 'zustand';

interface IDatePickerModalState {
  isOpen: boolean;
  isTimer: boolean;
  startDate: Date;
  endDate: Date;
  activeField: 'start' | 'end';
}

interface IDatePickerModalStore {
  datePickerModalState: IDatePickerModalState;

  toggleDatePickerModal: (isOpen: boolean, field?: 'start' | 'end') => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setAcitveField: (field: 'start' | 'end') => void;
}

const useDatePickerModalStore = create<IDatePickerModalStore>((set) => ({
  datePickerModalState: {
    isOpen: false,
    isTimer: false,
    startDate: new Date(),
    endDate: new Date(),
    activeField: 'start',
  },

  toggleDatePickerModal: (isOpen: boolean, field: 'start' | 'end' = 'start') =>
    set((state) => ({
      datePickerModalState: { ...state.datePickerModalState, isOpen, activeField: field },
    })),
  setAcitveField: (field: 'start' | 'end') =>
    set((state) => ({ datePickerModalState: { ...state.datePickerModalState, activeField: field } })),
  setIsTimer: (isTimer: boolean) =>
    set((state) => ({ datePickerModalState: { ...state.datePickerModalState, isTimer } })),
  setStartDate: (date: Date) =>
    set((state) => ({
      datePickerModalState: { ...state.datePickerModalState, startDate: date, activeField: 'end' },
    })),
  setEndDate: (date: Date) =>
    set((state) => ({ datePickerModalState: { ...state.datePickerModalState, endDate: date } })),
}));

export default useDatePickerModalStore;
