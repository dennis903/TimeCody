import { create } from 'zustand';

interface ISidebarPlusState {
  isOpen: boolean;
  placeholder: { [key: string]: string };
  value: string;
}

interface ISidebarModalStore {
  sidebarPlusState: ISidebarPlusState;

  toggleSidebarPlusModal: (isOpen: boolean) => void;
  setSidebarPlusPlaceholder: (id: string, placeholder: string) => void;
  setSidebarPlusValue: (value: string) => void;
}

const useSidebarModalStore = create<ISidebarModalStore>((set) => ({
  sidebarPlusState: {
    isOpen: false,
    placeholder: {},
    value: '',
  },

  toggleSidebarPlusModal: (isOpen: boolean) =>
    set((state: ISidebarModalStore) => ({ sidebarPlusState: { ...state.sidebarPlusState, isOpen } })),
  setSidebarPlusPlaceholder: (id: string, placeholder: string) =>
    set((state) => ({
      sidebarPlusState: {
        ...state.sidebarPlusState,
        placeholders: {
          ...state.sidebarPlusState.placeholder,
          [id]: placeholder,
        },
      },
    })),
  setSidebarPlusValue: (value: string) => set((state) => ({ sidebarPlusState: { ...state.sidebarPlusState, value } })),
}));

export default useSidebarModalStore;
