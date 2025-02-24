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

import CalendarModalItemContainer from './CalendarModalItem.container';

import { IEvent } from '@/types';

const CalendarModalContainer: FC = () => {
  const { calendarModalState, toggleCalendarModal } = useCalendarModalStore();
  const { toggleAdditionalModal } = useAdditionalModalStore();
  const [isEditOn, setIsEditOn] = useState(false);
  const [contentList, setContentList] = useState<IEvent[]>([]);

  const formatDate = () => {
    const year = calendarModalState.date.getFullYear();
    const month = calendarModalState.date.getMonth() + 1;
    const date = calendarModalState.date.getDate();

    return `${year}년 ${month}월 ${date}일`;
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['getCalendarByDate', calendarModalState.date],
    queryFn: async () => {
      try {
        const res = await repository.monthlyCalendar.getCalendarByDay(format(calendarModalState.date, 'yyyy-MM-dd')); //YYYY-MM-DD

        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    select: (data) => {
      return {
        periodList: data
          .filter((item: IEvent) => item.type === 'period')
          .map((item: IEvent) => ({ ...item, className: 'period-event' })),
        routineList: data
          .filter((item: IEvent) => item.type === 'routine')
          .map((item: IEvent) => ({ ...item, className: 'routine-event' })),
        scheduleList: data
          .filter((item: IEvent) => item.type === 'schedule')
          .map((item: IEvent) => ({ ...item, className: 'schedule-event' })),
        todoList: data
          .filter((item: IEvent) => item.type === 'todo')
          .map((item: IEvent) => ({ ...item, className: 'todo-event' })),
      };
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setContentList([...data.todoList, ...data.scheduleList, ...data.routineList, ...data.periodList]);
    }
  }, [isSuccess]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                      <CalendarModalItemContainer content={content} isEditOn={isEditOn} />
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              ) : (
                <div className="calendar-modal__contents">
                  {contentList.map((content, index) => (
                    <CalendarModalItemContainer key={index} content={content} isEditOn />
                  ))}
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
