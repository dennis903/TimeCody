import { type FC, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import './MonthlyCalendar.container.css';

interface IMonthlyCalendarContainerProps {
  date: Date;
}

const MonthlyCalendarContainer: FC<IMonthlyCalendarContainerProps> = (props) => {
  const calendarRef = useRef<FullCalendar>(null);
  const periodList = [
    { title: 'Long Event', start: '2024-11-07', end: '2024-11-10', color: 'purple', className: 'period-event' },
  ];
  const routineList = [
    {
      groupId: 'exercise',
      title: '운동',
      start: '2024-11-09T16:00:00',
      className: 'routine-event',
    },
    {
      groupId: 'exercise',
      title: '운동',
      start: '2024-11-11T16:00:00',
      className: 'routine-event',
    },
    {
      groupId: 'exercise',
      title: '운동',
      start: '2024-11-13T16:00:00',
      className: 'routine-event',
    },
  ];
  const scheduleList = [
    {
      title: '일정',
      start: '2024-11-01',
      className: 'schedule-event',
    },
  ];
  const todoList = [
    {
      title: '1984 독서',
      start: '2024-11-12T10:30:00',
      end: '2024-11-12T12:30:00',
      backgroundColor: 'red',
      className: 'todo-event',
    },
  ];

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(props.date);
    }
  }, [props.date]);

  return (
    <FullCalendar
      ref={calendarRef}
      locale="kr"
      headerToolbar={false}
      displayEventTime={false}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      editable={true}
      initialDate={props.date}
      dayCellContent={(arg) => {
        const { date } = arg;
        return date.getDate();
      }}
      events={[...periodList, ...routineList, ...scheduleList, ...todoList]}
    />
  );
};

export default MonthlyCalendarContainer;
