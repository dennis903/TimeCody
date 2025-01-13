import { create } from 'zustand';

interface ISidebarState {
  categorySubMenuList: {
    id: number;
    title: string;
    color: string;
  }[];
}

interface ISidebarStore {
  sidebarState: ISidebarState;

  setCategorySubMenuList: (categorySubMenuList: ISidebarState['categorySubMenuList']) => void;
}

const useSidebarStore = create<ISidebarStore>((set) => ({
  sidebarState: {
    categorySubMenuList: [],
  },

  setCategorySubMenuList: (categorySubMenuList: ISidebarState['categorySubMenuList']) =>
    set((state) => ({ sidebarState: { ...state.sidebarState, categorySubMenuList } })),
}));

export default useSidebarStore;
