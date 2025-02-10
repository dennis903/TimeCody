import { type FC, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import repository from '@/repository';

import useCalendarModalStore from '@/store/CalendarModal.store';
import './MonthlyCalendar.container.css';

import { IEvent } from '@/types';

interface IMonthlyCalendarContainerProps {
  date: Date;
}

const MonthlyCalendarContainer: FC<IMonthlyCalendarContainerProps> = (props) => {
  const calendarRef = useRef<FullCalendar>(null);
  const { toggleCalendarModal, setCalendarModalDate } = useCalendarModalStore();

  const handleDateClick = (info: { date: Date }) => {
    setCalendarModalDate(info.date);
    toggleCalendarModal(true);
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(props.date);
    }
  }, [props.date]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['monthlyCalendar', props.date],
    queryFn: async () => {
      try {
        const res = await repository.monthlyCalendar.getCalendarByMonth(
          `${props.date.getFullYear()}-${(props.date.getMonth() + 1).toString().padStart(2, '0')}`,
        );
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
          .filter((item: IEvent) => item.type === 'schdule')
          .map((item: IEvent) => ({ ...item, className: 'schedule-event' })),
        todoList: data
          .filter((item: IEvent) => item.type === 'todo')
          .map((item: IEvent) => ({ ...item, className: 'todo-event' })),
      };
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FullCalendar
      ref={calendarRef}
      locale="kr"
      headerToolbar={false}
      displayEventTime={false}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      editable={true}
      initialDate={props.date}
      dayCellContent={(arg) => {
        const { date } = arg;
        return date.getDate();
      }}
      events={isError ? [] : [...data?.periodList, ...data?.routineList, ...data?.scheduleList, ...data?.todoList]}
      dateClick={handleDateClick}
    />
  );
};

export default MonthlyCalendarContainer;
