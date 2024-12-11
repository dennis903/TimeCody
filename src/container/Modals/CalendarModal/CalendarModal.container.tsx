import { type FC } from 'react';
import IconComponent from '@/components/Icon/Icon.component';
import ModalComponent from '@/components/modal/Modal.component';

import './CalendarModal.container.css';

interface ICalendarModalContainerProps {
  date: Date;
  onClose: () => void;
}

const contentlist = [
  {
    id: 1,
    title: '1984 독서하기',
  },
  {
    id: 2,

    title: '포트폴리오 제작',
  },
  { id: 3, title: '영어 공부' },
  { id: 4, title: '과외 하기' },
  { id: 5, title: '학원 과제' },
];

const CalendarModalcontainer: React.FC<ICalendarModalContainerProps> = ({ date, onClose }) => {
  return (
    <ModalComponent>
      <div className="calendar-modal">
        <header className="calendar-modal__header">
          <div className="calendar-modal__header-item">
            <h2 className="calendar-modal__date">
              {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
            </h2>
            <button type="button" className="icon-btn" onClick={onClose}>
              <IconComponent icon="icon-close" />
            </button>
          </div>
          <div className="calendar-modal__header-item">
            <button type="button" className="icon-btn">
              <IconComponent icon="icon-plus" />
            </button>
            <button type="button" className="btn edit-btn">
              <span className="edit-order">순서 편집</span>
              <IconComponent icon="icon-order" />
            </button>
          </div>
        </header>
        <div className="calendar-modal__contents">
          {contentlist.map((content, id) => (
            <div key={id} className="calendar-modal__content">
              <input type="checkbox" className="calendar-modal__checkbox" />
              <p className="calendar-modal__content-title">{content.title}</p>
            </div>
          ))}
        </div>
        <footer className="calendar-modal__footer">
          <div className="calendar-modal__footer-item">
            <h2 className="calendar-modal__add-item">항목추가</h2>
          </div>
          <div className="calendar-modal__footer-item">
            <h2 className="calendar-modal__schedule-view">일정관리</h2>
          </div>
        </footer>
      </div>
    </ModalComponent>
  );
};

export default CalendarModalcontainer;
