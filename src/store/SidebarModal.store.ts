import { create } from 'zustand';

interface ISidebarModalState {
  isOpen: boolean;
  placeholder: string;
  value: string;
}

interface ISidebarModalStore {
  sidebarModalState: ISidebarModalState;

  toggleSidebarModal: (isOpen: boolean) => void;
  setSidebarModalPlaceholder: (placeholder: string) => void;
  setSidebarModalValue: (value: string) => void;
}

const useSidebarModalStore = create<ISidebarModalStore>((set) => ({
  sidebarModalState: {
    isOpen: false,
    placeholder: '',
    value: '',
  },

  toggleSidebarModal: (isOpen: boolean) =>
    set((state: ISidebarModalStore) => ({ sidebarModalState: { ...state.sidebarModalState, isOpen } })),
  setSidebarModalPlaceholder: (placeholder: string) =>
    set((state) => ({
      sidebarModalState: {
        ...state.sidebarModalState,
        placeholder,
      },
    })),
  setSidebarModalValue: (value: string) =>
    set((state) => ({ sidebarModalState: { ...state.sidebarModalState, value } })),
}));

export default useSidebarModalStore;
