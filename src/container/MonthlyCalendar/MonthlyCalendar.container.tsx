import { type FC } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import './MonthlyCalendar.container.css';

const MonthlyCalendarContainer: FC = () => {
  const periodList = [
    { title: 'Long Event', start: '2024-11-07', end: '2024-11-10', color: 'purple', className: 'period-event' },
  ];
  const routineList = [
    {
      groupId: 'exercise',
      title: '운동',
      start: '2024-11-09T16:00:00',
    },
    {
      groupId: 'exercise',
      title: '운동',
      start: '2024-11-11T16:00:00',
    },
    {
      groupId: 'exercise',
      title: '운동',
      start: '2024-11-13T16:00:00',
    },
  ];
  const scheduleList = [
    {
      title: '일정',
      start: '2024-11-01',
    },
  ];
  const todoList = [
    {
      title: '1984 독서',
      start: '2024-11-12T10:30:00',
      end: '2024-11-12T12:30:00',
    },
  ];

  return (
    <FullCalendar
      locale="kr"
      headerToolbar={false}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      dayCellContent={(arg) => {
        const { date } = arg;
        return date.getDate();
      }}
      events={[...periodList, ...routineList, ...scheduleList, ...todoList]}
    />
  );
};

export default MonthlyCalendarContainer;
