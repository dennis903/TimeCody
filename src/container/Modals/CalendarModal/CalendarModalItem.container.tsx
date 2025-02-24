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
  let typeLabel = '';
  switch (props.content.type) {
    case 'todo':
      typeLabel = '할 일';
      break;
    case 'routine':
      typeLabel = '습관';
      break;
    case 'schedule':
      typeLabel = '일정';
      break;
    case 'period':
      typeLabel = '구간';
      break;
    default:
      typeLabel = '';
      break;
  }

  let statusLabel = '';
  switch (props.content.status) {
    case 0:
      statusLabel = '미완료';
      break;
    case 1:
      statusLabel = '진행중';
      break;
    case 2:
      statusLabel = '완료';
      break;
    default:
      statusLabel = '';
  }

  return (
    <div className="calendar-modal__content">
      <div className="calendar-modal__checkbox">
        {(props.content.type === 'todo' || props.content.type === 'routine') &&
          (props.content.status === 0 ? null : props.content.status === 1 ? (
            <DoingSvg />
          ) : props.content.status === 2 ? (
            <CompleteSvg />
          ) : null)}
      </div>
      <div className="calendar-modal__item">
        <div className="calendar-modal__item-edit">
          <p className="calendar-modal__content-title">{props.content.title}</p>
          {props.isEditOn && <IconComponent icon="icon-order-edit" />}
        </div>
        <div className="calendar-modal__content-state">
          <p className="calendar-modal__state-type">{typeLabel}</p>
          <p className="calendar-modal__state-description">{statusLabel}</p>
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
