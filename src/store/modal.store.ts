import { create } from 'zustand';

interface ISideabrPlusState {
  isOpen: boolean;
  placeholder: string;
}

const useModalStore = create((set) => ({
  sidebarPlusState: {
    isOpen: false,
    placeholder: '',
  },

  openSidebarPlusModal: () => set((state: ISideabrPlusState) => ({ sidebarPlusState: { ...state, isOpen: true } })),
}));

export default useModalStore;
