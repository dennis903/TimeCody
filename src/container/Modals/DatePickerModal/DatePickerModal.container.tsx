import { type FC, useEffect, useLayoutEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { format, set } from 'date-fns';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';

import TimePickerContainer from '@/container/TimePicker/TimePicker.container';

import IconComponent from '@/components/Icon/Icon.component';
import ModalComponent from '@/components/modal/Modal.component';
import useDatePickerModalStore from '@/store/DatePickerModal.store';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerModal.container.css';

const cx = classNames.bind({});

const DatePickerModalContainer: FC = () => {
  const { datePickerModalState, toggleDatePickerModal, setStartDate, setEndDate } = useDatePickerModalStore();
  const [isActiveField, setIsActiveField] = useState<'start' | 'end'>('start');

  const [isSelectingStart, setIsSelectingStart] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  const onClickActiveStart = () => {
    setIsActiveField('start');
    toggleDatePickerModal(true, 'start');
  };

  const onClickActiveEnd = () => {
    setIsActiveField('end');
    toggleDatePickerModal(true, 'end');
  };

  const onCloseModal = () => {
    toggleDatePickerModal(false);

    if (datePickerModalState.startDate > datePickerModalState.endDate) {
      setEndDate(datePickerModalState.startDate);
    }
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
    setIsActiveField(datePickerModalState.activeField);
  }, [datePickerModalState.activeField]);

  useEffect(() => {
    setIsSelectingStart(isActiveField === 'start');
  }, [isActiveField]);

  useEffect(() => {
    setCurrentDate(datePickerModalState.startDate);
  }, [datePickerModalState.startDate]);

  return (
    <ModalComponent isOpen={datePickerModalState.isOpen} zIndex={20000} onClose={onCloseModal}>
      <div className="date-picker-modal">
        <div className="date-picker-modal__header">
          <div
            className={cx('time-table', {
              on: isActiveField === 'start',
              off: isActiveField !== 'start',
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
              on: isActiveField !== 'start',
              off: isActiveField === 'start',
            })}
            onClick={onClickActiveEnd}
          >
            <span className="time-table__header">종료</span>
            <span className="time-table__time">{formatDate(datePickerModalState?.endDate)}</span>
            {false && <span className="time-table__clock">{formatTime(datePickerModalState?.endDate)}</span>}
          </div>
        </div>
        <div className="date-picker-modal__main">
          <TimePickerContainer
            isSelectingStart={isSelectingStart}
            setIsSelectingStart={(value) => {
              setIsSelectingStart(value);
              setIsActiveField(value ? 'start' : 'end');
            }}
            activeField={isActiveField}
            setIsActiveField={setIsActiveField}
            startDate={datePickerModalState.startDate}
            endDate={datePickerModalState.endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onClose={onCloseModal}
          />
          {/* <DatePicker
            selected={currentDate}
            onChange={(date) => handleDateChange(date as Date)}
            startDate={datePickerModalState.startDate}
            minDate={!isSelectingStart && datePickerModalState.startDate ? datePickerModalState.startDate : undefined}
            dateFormatCalendar={'yyyy년 MM월'}
            inline
            showDisabledMonthNavigation
            locale={ko}
          /> */}
        </div>
      </div>
    </ModalComponent>
  );
};

export default DatePickerModalContainer;
