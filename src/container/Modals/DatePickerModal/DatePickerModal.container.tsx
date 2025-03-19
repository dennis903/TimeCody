import { type FC, useState } from 'react';
import classNames from 'classnames/bind';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';

import IconComponent from '@/components/Icon/Icon.component';
import ModalComponent from '@/components/modal/Modal.component';
import useDatePickerModalStore from '@/store/DatePickerModal.store';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerModal.container.css';

const cx = classNames.bind({});

const DatePickerModalContainer: FC = () => {
  const { datePickerModalState, toggleDatePickerModal } = useDatePickerModalStore();
  const [activeTimeTable, setActiveTimeTable] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date: Date) => {
    console.log(date);
    setStartDate(date);
  };

  return (
    <ModalComponent isOpen={false} zIndex={20000} onClose={() => toggleDatePickerModal(false)}>
      <div className="date-picker-modal">
        <div className="date-picker-modal__header">
          <div
            className={cx('time-table', {
              on: activeTimeTable,
            })}
            onClick={() => setActiveTimeTable(true)}
          >
            <span className="time-table__header">시작</span>
            <span className="time-table__time">3월 19일</span>
            <span className="time-table__clock">오후 8:00</span>
          </div>
          <IconComponent
            className="icon-btn"
            icon="icon-arrow"
            style={{
              width: '1.5rem',
            }}
          />
          <div
            className={cx('time-table', {
              on: !activeTimeTable,
            })}
            onClick={() => setActiveTimeTable(false)}
          >
            <span className="time-table__header">종료</span>
            <span className="time-table__time">3월 19일</span>
            <span className="time-table__clock">오후 10:00</span>
          </div>
        </div>
        <div className="date-picker-modal__main">
          <DatePicker
            selected={startDate}
            onChange={(date) => handleStartDateChange(date as Date)}
            startDate={startDate}
            dateFormatCalendar={'yyyy년 MM월'}
            inline
            showDisabledMonthNavigation
            locale={ko}
          />
        </div>
      </div>
    </ModalComponent>
  );
};

export default DatePickerModalContainer;
