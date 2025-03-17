import { create } from 'zustand';

interface IDatePickerModalState {
  isOpen: boolean;
  isTimer: boolean;
  startDate: Date;
  endDate: Date;
}

interface IDatePickerModalStore {
  datePickerModalState: IDatePickerModalState;

  toggleDatePickerModal: (isOpen: boolean) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const useDatePickerModalStore = create<IDatePickerModalStore>((set) => ({
  datePickerModalState: {
    isOpen: false,
    isTimer: false,
    startDate: new Date(),
    endDate: new Date(),
  },

  toggleDatePickerModal: (isOpen: boolean) =>
    set((state: IDatePickerModalStore) => ({ datePickerModalState: { ...state.datePickerModalState, isOpen } })),
  setIsTimer: (isTimer: boolean) =>
    set((state: IDatePickerModalStore) => ({ datePickerModalState: { ...state.datePickerModalState, isTimer } })),
  setStartDate: (date: Date) =>
    set((state: IDatePickerModalStore) => ({ datePickerModalState: { ...state.datePickerModalState, date } })),
  setEndDate: (date: Date) =>
    set((state: IDatePickerModalStore) => ({ datePickerModalState: { ...state.datePickerModalState, date } })),
}));

export default useDatePickerModalStore;
