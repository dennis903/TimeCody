import { create } from 'zustand';

interface ISidebarPlusState {
  isOpen: boolean;
  placeholder: string;
  value: string;
}

interface ISidebarModalStore {
  sidebarPlusState: ISidebarPlusState;

  toggleSidebarPlusModal: (isOpen: boolean) => void;
  setSidebarPlusPlaceholder: (placeholder: string) => void;
  setSidebarPlusValue: (value: string) => void;
}

const useSidebarModalStore = create<ISidebarModalStore>((set) => ({
  sidebarPlusState: {
    isOpen: false,
    placeholder: '',
    value: '',
  },

  toggleSidebarPlusModal: (isOpen: boolean) =>
    set((state: ISidebarModalStore) => ({ sidebarPlusState: { ...state.sidebarPlusState, isOpen } })),
  setSidebarPlusPlaceholder: (placeholder: string) =>
    set((state: ISidebarModalStore) => ({ sidebarPlusState: { ...state.sidebarPlusState, placeholder } })),
  setSidebarPlusValue: (value: string) =>
    set((state: ISidebarModalStore) => ({ sidebarPlusState: { ...state.sidebarPlusState, value } })),
}));

export default useSidebarModalStore;
