import { create } from 'zustand';

interface ISidebarModalState {
  isOpen: boolean;
  placeholder: string;
  id: number;
  value: string;
  color: string;
  editType: 'edit' | 'add';
  currentCategory: string;
}

interface ISidebarModalStore {
  sidebarModalState: ISidebarModalState;

  toggleSidebarModal: (isOpen: boolean) => void;
  setSidebarModalPlaceholder: (placeholder: string) => void;
  setSidebarModalValue: (value: string) => void;
  setSidebarModalColor: (color: string) => void;
  setSidebarModalId: (id: number) => void;
  setSidebarModalEditType: (editType: 'edit' | 'add') => void;
  setSidebarModalCurrentCategory: (currentCategory: string) => void;
}

const useSidebarModalStore = create<ISidebarModalStore>((set) => ({
  sidebarModalState: {
    isOpen: false,
    id: 0,
    placeholder: '',
    value: '',
    color: '',
    editType: 'edit',
    currentCategory: 'category',
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
  setSidebarModalColor: (color: string) =>
    set((state) => ({ sidebarModalState: { ...state.sidebarModalState, color } })),
  setSidebarModalId: (id: number) => set((state) => ({ sidebarModalState: { ...state.sidebarModalState, id } })),
  setSidebarModalEditType: (editType: 'add' | 'edit') =>
    set((state) => ({ sidebarModalState: { ...state.sidebarModalState, editType } })),
  setSidebarModalCurrentCategory: (currentCategory: string) =>
    set((state) => ({ sidebarModalState: { ...state.sidebarModalState, currentCategory } })),
}));

export default useSidebarModalStore;
