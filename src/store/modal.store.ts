import { create } from 'zustand';

interface IModalState {
  isOpen: boolean;
}

interface IModalStore {
  modalState: IModalState;

  toggleModal: (isOpen: boolean) => void;
}

const useModalStore = create<IModalStore>((set) => ({
  modalState: {
    isOpen: false,
  },

  toggleModal: (isOpen: boolean) => set((state: IModalStore) => ({ modalState: { ...state.modalState, isOpen } })),
}));

export default useModalStore;
