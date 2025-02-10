import { type FC, useState } from 'react';
import IconComponent from '@/components/Icon/Icon.component';
import ModalComponent from '@/components/modal/Modal.component';
import { Link } from 'react-router-dom';
import { Reorder } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect } from 'react';

import './CalendarModal.container.css';
import useCalendarModalStore from '@/store/CalendarModal.store';
import useAdditionalModalStore from '@/store/AdditionalModal.store';
import repository from '@/repository';

const CalendarModalContainer: FC = () => {
  const { calendarModalState, toggleCalendarModal } = useCalendarModalStore();
  const { toggleAdditionalModal } = useAdditionalModalStore();
  const [isEditOn, setIsEditOn] = useState(false);
  const [contentList, setContentList] = useState<{ title: string }[]>([]);

  const formatDate = () => {
    const year = calendarModalState.date.getFullYear();
    const month = calendarModalState.date.getMonth() + 1;
    const date = calendarModalState.date.getDate();

    return `${year}년 ${month}월 ${date}일`;
  };

  const { data, isSuccess } = useQuery({
    queryKey: ['getCalendarByDate', calendarModalState.date],
    queryFn: async () => {
      try {
        const res = await repository.monthlyCalendar.getCalendarByDay(format(calendarModalState.date, 'yyyy-MM-dd')); //YYYY-MM-DD

        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    setContentList(data);
  }, [isSuccess]);

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
          {isSuccess && (
            <div className="calendar-modal__contents">
              {isEditOn ? (
                <Reorder.Group axis="y" values={contentList} onReorder={setContentList}>
                  {contentList?.map((content, index) => (
                    <Reorder.Item key={index} value={content}>
                      <div className="calendar-modal__content">
                        <div className="calendar-modal__checkbox"></div>
                        <div className="calendar-modal__item">
                          <div className="calendar-modal__item-edit">
                            <p className="calendar-modal__content-title">{content.title}</p>
                            <IconComponent icon="icon-order-edit" />
                          </div>
                          <div className="calendar-modal__content-state">
                            <p className="calendar-modal__state-type">할 일</p>
                            <p className="calendar-modal__state-description">미완료</p>
                          </div>
                        </div>
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              ) : (
                <div className="calendar-modal__contents">
                  <div className="calendar-modal__content">
                    <div className="calendar-modal__checkbox"></div>
                    {contentList?.map((content, index) => (
                      <div key={index} className="calendar-modal__item">
                        <p className="calendar-modal__content-title">{content.title}</p>
                        <div className="calendar-modal__content-state">
                          <p className="calendar-modal__state-type">할 일</p>
                          <p className="calendar-modal__state-description">미완료</p>
                        </div>
                        <div className="calendar-modal__checkbox-selected">
                          <div className="calendar-modal__checkbox-content">
                            <button type="button" className="icon-btn">
                              <IconComponent icon="icon-complete" />
                            </button>
                            <span className="calendar-modal__checkbox-description">완료</span>
                          </div>
                          <div className="calendar-modal__checkbox-content">
                            <button type="button" className="icon-btn">
                              <IconComponent icon="icon-doing" />
                            </button>
                            <span className="calendar-modal__checkbox-description">진행중</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <footer className="calendar-modal__footer">
            <div className="calendar-modal__footer-item">
              <Link to="/calendar/schedule" style={{ color: '#343434' }}>
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
