import { type FC } from 'react';
import IconComponent from '@/components/Icon/Icon.component';

import './CalendarModal.container.css';
import { IEvent } from '@/types';

import CompleteSvg from '@/components/svg/CompleteSvg';
import DoingSvg from '@/components/svg/DoingSvg';

interface ICalendarModalItemContainerProps {
  content: IEvent;
  isEditOn: boolean;
}

const CalendarModalItemContainer: FC<ICalendarModalItemContainerProps> = (props) => {
  return (
    <div className="calendar-modal__content">
      <div className="calendar-modal__checkbox"></div>
      <div className="calendar-modal__item">
        <div className="calendar-modal__item-edit">
          <p className="calendar-modal__content-title">{props.content.title}</p>
          {props.isEditOn && <IconComponent icon="icon-order-edit" />}
        </div>
        <div className="calendar-modal__content-state">
          <p className="calendar-modal__state-type">할 일</p>
          <p className="calendar-modal__state-description">미완료</p>
        </div>
        <div className="calendar-modal__checkbox-selected">
          <div className="calendar-modal__checkbox-content">
            <button type="button" className="icon-btn">
              <CompleteSvg />
            </button>
            <span className="calendar-modal__checkbox-description">완료</span>
          </div>
          <div className="calendar-modal__checkbox-content">
            <button type="button" className="icon-btn">
              <DoingSvg />
            </button>
            <span className="calendar-modal__checkbox-description">진행중</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModalItemContainer;
