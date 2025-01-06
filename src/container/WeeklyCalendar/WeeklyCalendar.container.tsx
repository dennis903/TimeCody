import IconComponent from '@/components/Icon/Icon.component';
import { type FC } from 'react';

interface IWeeklyCalendarContainerProps {
  date: Date;
}

const WeeklyCalendarContainer: FC<IWeeklyCalendarContainerProps> = () => {
  return (
    <>
      <div className="schedule-list">
        <div className="schedule-item">
          <div className="schedule-check schedule-check--complete"></div>
          <p className="schedule-item-subtitle">1984 독서하기</p>
        </div>
        <div className="schedule-item">
          <div className="schedule-check schedule-check--doing"></div>
          <p className="schedule-item-subtitle">포트폴리오 제작</p>
        </div>
        <div className="schedule-item">
          <div className="schedule-check"></div>
          <p className="schedule-item-subtitle">영어 공부</p>
        </div>
        <div className="schedule-item">
          <div className="schedule-check"></div>
          <p className="schedule-item-subtitle">과외 하기</p>
        </div>
        <div className="schedule-open">
          <button className="icon-btn">
            <IconComponent className="icon-open" />
          </button>
        </div>
      </div>
    </>
  );
};

export default WeeklyCalendarContainer;
