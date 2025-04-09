import { useRef, type FC } from 'react';
import { useState, useLayoutEffect, useEffect } from 'react';
import TimePicker from '@/components/timePicker/TimePicker.component';

import { format } from 'date-fns';

import './TimePicker.container.css';

interface ITimePickerContainerProps {
  isSelectingStart: boolean;
  setIsSelectingStart: (value: boolean) => void;
  onClose: () => void;
  startDate: Date;
  endDate: Date;
  activeField: 'start' | 'end';
  setIsActiveField?: (value: 'start' | 'end') => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const TimePickerContainer: FC<ITimePickerContainerProps> = (props) => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('오전');
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [days, setDays] = useState<string[]>([]);
  const dayScrollRef = useRef<HTMLDivElement>(null);

  // 시간,분 데이터 만들기(인덱스 활용)
  // 인덱스를 문자열로 변환하고 문자열 길이 2자리로 만들기(앞에 "0"채움)
  const timePeriod = ['오전', '오후'];
  const hours = [...Array(12)].map((_, i) => (i === 0 ? '12' : i.toString()));
  const minutes = [...Array(60)].map((_, i) => i.toString().padStart(2, '0'));

  const handleTimePeriodScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 40);

    setSelectedTimePeriod(timePeriod[index]);
  };

  const handleDayScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 40);
    if (index >= 0 && index < days.length) {
      setSelectedDay(days[index]);
    }
  };

  // 시간,분 스크롤 이벤트 핸들러
  const handleHourScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 40); // 40px 단위로 스크롤 위치 계산
    setSelectedHour(hours[index]); // 해당 인덱스의 값(시간)으로 상태 업데이트
  };

  const handleMinuteScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / 40);
    setSelectedMinute(minutes[index] || '00');
  };

  const handleConfirm = () => {
    const [year, month, day] = selectedDay.replace('년', '').replace('월', '').replace('일', '').split(' ').map(Number);

    let hour = parseInt(selectedHour, 10);
    const minute = parseInt(selectedMinute, 10);

    if (selectedTimePeriod === '오후' && hour !== 12) hour += 12;
    if (selectedTimePeriod === '오전' && hour === 12) hour = 0;

    const newDate = new Date(year, month - 1, day, hour, minute);

    const isStartMode = props.isSelectingStart;

    if (isStartMode) {
      props.setStartDate(newDate);
      props.setIsSelectingStart(false);
      props.setIsActiveField?.('end');
    } else {
      props.setEndDate(newDate);
      props.onClose();
    }
  };

  useLayoutEffect(() => {
    const formatDateStr = (date: Date) => format(date, 'yyyy년 MM월 dd일');
    // 1. startDate면 해당 날짜 전후 1년의 날짜들을 days배열에 추가한다.
    if (props.isSelectingStart) {
      const startDate = new Date(props.startDate);

      // 1년(365일) 전부터 startDate까지
      const beforeDates = Array.from({ length: 365 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() - (365 - i));
        return formatDateStr(date);
      });

      // startDate 이후부터 1년(365일) 뒤까지
      const afterDates = Array.from({ length: 365 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i + 1); // +1 to start from the day after
        return formatDateStr(date);
      });

      setDays([...beforeDates, formatDateStr(startDate), ...afterDates]);

      setSelectedDay(formatDateStr(startDate));
    } else {
      const startDate = new Date(props.startDate);
      const endDate = new Date(props.endDate);
      // 2. endDate면 startDate 이후 날짜만 days배열에 추가한다.
      const futureDates = Array.from({ length: 365 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i + 1);
        return formatDateStr(date);
      });

      setDays(futureDates);
      // 4. endDate면  selectedDate는 endDate의 days[index]로 초기화 한다.
      const endDateStr = formatDateStr(endDate);
      setSelectedDay(endDateStr);
    }
  }, [props.isSelectingStart, props.startDate, props.endDate]);

  useEffect(() => {
    if (days.length > 0) {
      const selectedIndex = days.findIndex((d) => d === selectedDay);
      if (dayScrollRef.current && selectedIndex >= 0) {
        dayScrollRef.current.scrollTop = selectedIndex * 40;
      }
    }
  }, [days, selectedDay]);

  return (
    <div className="picker-container">
      <div className="modal-picker-wrapper">
        <TimePicker
          time={days}
          handleTimeScroll={handleDayScroll}
          selectedTime={selectedDay}
          scrollRef={dayScrollRef}
          customClassName="day-picker"
        />
        <TimePicker time={timePeriod} handleTimeScroll={handleTimePeriodScroll} selectedTime={selectedTimePeriod} />
        <TimePicker time={hours} handleTimeScroll={handleHourScroll} selectedTime={selectedHour} />
        <span className="modal-colon">:</span>
        <TimePicker time={minutes} handleTimeScroll={handleMinuteScroll} selectedTime={selectedMinute} />
      </div>
      <div className="modal-picker-actions">
        <span className="modal-picker-btn" onClick={handleConfirm}>
          확인
        </span>
        <span className="modal-picker-btn" onClick={props.onClose}>
          취소
        </span>
      </div>
    </div>
  );
};

export default TimePickerContainer;
