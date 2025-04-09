import { type FC } from 'react';

import './TimePicker.component.css';

interface ITimePickerComponentProps {
  time: string[];
  handleTimeScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  selectedTime: string;
  scrollRef?: React.RefObject<HTMLDivElement>;
  customClassName?: string;
}

const TimePicker: FC<ITimePickerComponentProps> = (props) => {
  return (
    <div className={`time-picker-container ${props.customClassName ?? ''}`}>
      {/* 선택 박스 */}
      <div className="time-picker-highlight" />

      {/* 스크롤 박스 */}
      <div className="time-picker-scroll" onScroll={props.handleTimeScroll} ref={props.scrollRef}>
        {props.time.map((t) => (
          <div key={t} className={`time-picker-item ${props.selectedTime === t ? 'selected' : 'unselected'}`}>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimePicker;
