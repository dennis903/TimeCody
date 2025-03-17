import { type FC, useState } from 'react';

import ModalComponent from '@/components/modal/Modal.component';
import useDatePickerModalStore from '@/store/DatePickerModal.store';

import './DatePickerModal.container.css';

const DatePickerModalContainer: FC = () => {
  const { datePickerModalState, toggleDatePickerModal } = useDatePickerModalStore();

  return (
    <ModalComponent isOpen={true} zIndex={20000} onClose={() => toggleDatePickerModal(false)}>
      <div className="date-picker-modal"></div>
    </ModalComponent>
  );
};

export default DatePickerModalContainer;
