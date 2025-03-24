import { type FC, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { format, set } from 'date-fns';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';

import IconComponent from '@/components/Icon/Icon.component';
import ModalComponent from '@/components/modal/Modal.component';
import useDatePickerModalStore from '@/store/DatePickerModal.store';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerModal.container.css';

const cx = classNames.bind({});

const DatePickerModalContainer: FC = () => {
  const { datePickerModalState, toggleDatePickerModal, setAcitveField, setStartDate, setEndDate } =
    useDatePickerModalStore();
  const [isActiveField, setIsActiveField] = useState<'start' | 'end'>(datePickerModalState.activeField);
  const [isSelectingStart, setIsSelectingStart] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  const onClickActiveStart = () => {
    toggleDatePickerModal(true, 'start');
  };

  const onClickActiveEnd = () => {
    toggleDatePickerModal(true, 'end');
  };

  const handleDateChange = (date: Date) => {
    if (isSelectingStart) {
      setStartDate(date);
      setIsActiveField('end');
    } else {
      setEndDate(date);
      setIsActiveField('start');
      toggleDatePickerModal(false);
    }

    setCurrentDate(date);
  };

  const formatDate = (date: Date) => {
    return format(date, 'M월 d일', { locale: ko });
  };
  const formatTime = (date: Date) => {
    return format(date, 'a h:mm', { locale: ko });
  };

  useEffect(() => {
    setIsSelectingStart(isActiveField === 'start');
  }, [isActiveField]);

  useEffect(() => {
    setCurrentDate(isSelectingStart ? datePickerModalState.startDate : datePickerModalState.endDate);
  }, [isSelectingStart, datePickerModalState.startDate, datePickerModalState.endDate]);

  // useEffect(() => {
  //   setCurrentDate(isSelectingStart ? datePickerModalState.startDate : datePickerModalState.endDate);
  // }, [isSelectingStart]);

  return (
    <ModalComponent isOpen={datePickerModalState.isOpen} zIndex={20000} onClose={() => toggleDatePickerModal(false)}>
      <div className="date-picker-modal">
        <div className="date-picker-modal__header">
          <div
            className={cx('time-table', {
              on: isSelectingStart,
              off: !isSelectingStart,
            })}
            onClick={onClickActiveStart}
          >
            <span className="time-table__header">시작</span>
            <span className="time-table__time">{formatDate(datePickerModalState.startDate)}</span>
            {false && <span className="time-table__clock">{formatTime(datePickerModalState.startDate)}</span>}
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
              on: !isSelectingStart,
              off: isSelectingStart,
            })}
            onClick={onClickActiveEnd}
          >
            <span className="time-table__header">종료</span>
            <span className="time-table__time">{formatDate(datePickerModalState?.endDate)}</span>
            {false && <span className="time-table__clock">{formatTime(datePickerModalState?.endDate)}</span>}
          </div>
        </div>
        <div className="date-picker-modal__main">
          <DatePicker
            selected={currentDate}
            onChange={(date) => handleDateChange(date as Date)}
            startDate={datePickerModalState.startDate}
            minDate={!isSelectingStart && datePickerModalState.startDate ? datePickerModalState.startDate : undefined}
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
