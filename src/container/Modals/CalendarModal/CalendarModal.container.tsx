import { type FC, useState } from 'react';
import IconComponent from '@/components/Icon/Icon.component';
import ModalComponent from '@/components/modal/Modal.component';
import { Link } from 'react-router-dom';
import { Reorder } from 'framer-motion';

import './CalendarModal.container.css';
import useCalendarModalStore from '@/store/CalendarModal.store';
import useAdditionalModalStore from '@/store/AdditionalModal.store';

const CalendarModalContainer: FC = () => {
  const { calendarModalState, toggleCalendarModal } = useCalendarModalStore();
  const { toggleAdditionalModal } = useAdditionalModalStore();
  const [isEditOn, setIsEditOn] = useState(false);
  const [contentList, setContentList] = useState([
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
  ]);

  const formatDate = () => {
    const year = calendarModalState.date.getFullYear();
    const month = calendarModalState.date.getMonth() + 1;
    const date = calendarModalState.date.getDate();

    return `${year}년 ${month}월 ${date}일`;
  };

  return (
    calendarModalState.isOpen && (
      <ModalComponent>
        <div className="calendar-modal">
          <header className="calendar-modal__header">
            <div className="calendar-modal__header-item">
              <h2 className="calendar-modal__date">{formatDate()}</h2>
              <button type="button" className="icon-btn" onClick={() => toggleCalendarModal(false)}>
                <IconComponent icon="icon-close" />
              </button>
            </div>
            <div className="calendar-modal__header-item">
              <button type="button" className="icon-btn" onClick={() => toggleAdditionalModal(true)}>
                <IconComponent icon="icon-plus" />
              </button>
              <button type="button" className="btn edit-btn" onClick={() => setIsEditOn((prev) => !prev)}>
                <span className="edit-order">순서 편집</span>
                <IconComponent icon="icon-order" />
              </button>
            </div>
          </header>
          <div className="calendar-modal__contents">
            {isEditOn ? (
              <Reorder.Group axis="y" values={contentList} onReorder={setContentList}>
                {contentList.map((content) => (
                  <Reorder.Item key={content.id} value={content}>
                    <div className="calendar-modal__content">
                      <div className="calendar-modal__checkbox" />
                      <p className="calendar-modal__content-title">{content.title}</p>
                      <IconComponent icon="icon-order-edit" />
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            ) : (
              <div>
                {contentList.map((content) => (
                  <div key={content.id} className="calendar-modal__content">
                    <div className="calendar-modal__checkbox" />
                    <p className="calendar-modal__content-title">{content.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <footer className="calendar-modal__footer">
            <div className="calendar-modal__footer-item">
              <Link to="/calendar/schedule">
                <h2 className="calendar-modal__schedule-view">일정관리</h2>
              </Link>
            </div>
          </footer>
        </div>
      </ModalComponent>
    )
    // {isAdditionalModalOpen && <AdditionalModal date={date} />}
  );
};

export default CalendarModalContainer;
