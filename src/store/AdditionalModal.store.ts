import { create } from 'zustand';

interface IAdditionalModalState {
  isOpen: boolean;
  date: Date;
}

interface IAdditionalModalStore {
  additionalModalState: IAdditionalModalState;

  toggleAdditionalModal: (isOpen: boolean) => void;
  setAdditionalModalDate: (date: Date) => void;
}

const useAdditionalModalStore = create<IAdditionalModalStore>((set) => ({
  additionalModalState: {
    isOpen: false,
    date: new Date(),
  },

  toggleAdditionalModal: (isOpen: boolean) =>
    set((state: IAdditionalModalStore) => ({ additionalModalState: { ...state.additionalModalState, isOpen } })),
  setAdditionalModalDate: (date: Date) =>
    set((state: IAdditionalModalStore) => ({ additionalModalState: { ...state.additionalModalState, date } })),
}));

export default useAdditionalModalStore;
