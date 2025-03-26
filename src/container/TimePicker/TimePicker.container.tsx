import { type FC } from 'react';
import { useState } from 'react';
import TimePicker from '@/components/timePicker/TimePicker.component';

import './TimePicker.container.css';

interface ITimePickerContainerProps {
  onTimeSelect: (time: string) => void;
  onClose: () => void;
}

const TimePickerContainer: FC<ITimePickerContainerProps> = ({ onTimeSelect, onClose }) => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('오전');
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');

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

  return (
    <div className="picker-container">
      <div className="modal-picker-wrapper">
        <TimePicker time={timePeriod} handleTimeScroll={handleTimePeriodScroll} selectedTime={selectedTimePeriod} />
        <TimePicker time={hours} handleTimeScroll={handleHourScroll} selectedTime={selectedHour} />
        <span className="modal-colon">:</span>
        <TimePicker time={minutes} handleTimeScroll={handleMinuteScroll} selectedTime={selectedMinute} />
      </div>
    </div>
  );
};

export default TimePickerContainer;
