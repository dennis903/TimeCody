import { create } from 'zustand';
import { TCalendarType } from '@/types';

interface IAdditionalModalData {
  title: string;
  color?: string;
  category: string;
  isTimeOn: boolean;
  isRepeatOn: boolean;
  notice: {
    isOn: boolean;
    time: Date;
  };
  isDDayOn: boolean;
  isLocationOn: boolean;
  participants?: string[];
  memo?: string;
  calendarCategory: string;
}

interface IAdditionalModalState {
  isOpen: boolean;
  isEdit: boolean; // 수정 모드인지 여부
  type: TCalendarType; // 캘린더 타입 (period, routine, schedule, todo)
  date: Date; // 캘린더 모달 선택 날짜 표시
  additionalModalData: IAdditionalModalData;
}

interface IAdditionalModalStore {
  additionalModalState: IAdditionalModalState;

  toggleAdditionalModal: (isOpen: boolean) => void;
  toggleEditMode: (isEdit: boolean) => void;
  setAdditionalModalDate: (date: Date) => void;
  setAdditionalModalData: (data: Partial<IAdditionalModalState['additionalModalData']>) => void;
  initAdditionalModalData: () => void;
}

const useAdditionalModalStore = create<IAdditionalModalStore>((set) => ({
  additionalModalState: {
    isOpen: false,
    isEdit: false,
    type: 'schedule',
    date: new Date(),
    additionalModalData: {
      title: '',
      category: '',
      color: '#000000',
      isTimeOn: false,
      isRepeatOn: false,
      notice: {
        isOn: false,
        time: new Date(),
      },
      isDDayOn: false,
      isLocationOn: false,
      participants: [],
      memo: '',
      calendarCategory: '',
    },
  },

  toggleAdditionalModal: (isOpen: boolean) =>
    set((state: IAdditionalModalStore) => ({ additionalModalState: { ...state.additionalModalState, isOpen } })),
  toggleEditMode: (isEdit: boolean) =>
    set((state: IAdditionalModalStore) => ({ additionalModalState: { ...state.additionalModalState, isEdit } })),
  setAdditionalModalDate: (date: Date) =>
    set((state: IAdditionalModalStore) => ({ additionalModalState: { ...state.additionalModalState, date } })),
  setAdditionalModalData: (data: Partial<IAdditionalModalData>) =>
    set((state: IAdditionalModalStore) => ({
      additionalModalState: {
        ...state.additionalModalState,
        additionalModalData: {
          ...state.additionalModalState.additionalModalData,
          ...data,
        },
      },
    })),
  initAdditionalModalData: () => {
    set((state: IAdditionalModalStore) => ({
      additionalModalState: {
        ...state.additionalModalState,
        isEdit: false,
        type: 'schedule',
      },
    }));
    set((state: IAdditionalModalStore) => ({
      additionalModalState: {
        ...state.additionalModalState,
        additionalModalData: {
          title: '',
          color: '#000000',
          category: '',
          isTimeOn: false,
          isRepeatOn: false,
          notice: {
            isOn: false,
            time: new Date(),
          },
          isDDayOn: false,
          isLocationOn: false,
          participants: [],
          memo: '',
          calendarCategory: '',
        },
      },
    }));
  },
}));

export default useAdditionalModalStore;
