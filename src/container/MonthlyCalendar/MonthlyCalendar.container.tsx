import { type FC, useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import repository from '@/repository';

import useCalendarModalStore from '@/store/CalendarModal.store';
import './MonthlyCalendar.container.css';

interface IMonthlyCalendarContainerProps {
  date: Date;
}

interface IEvent {
  type: 'period' | 'routine' | 'schdule' | 'todo';
  title: string;
  start: string;
  end?: string;
  color?: string;
  groupId?: string;
  backgroundColor?: string;
}

const MonthlyCalendarContainer: FC<IMonthlyCalendarContainerProps> = (props) => {
  const calendarRef = useRef<FullCalendar>(null);
  const { toggleCalendarModal, setCalendarModalDate } = useCalendarModalStore();
  const [periodList, setPeriodList] = useState<IEvent[]>([]);
  const [routineList, setRoutineList] = useState<IEvent[]>([]);
  const [scheduleList, setScheduleList] = useState<IEvent[]>([]);
  const [todoList, setTodoList] = useState<IEvent[]>([]);

  const handleDateClick = (info: { date: Date }) => {
    setCalendarModalDate(info.date);
    toggleCalendarModal(true);
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(props.date);
    }
  }, [props.date]);

  useEffect(() => {
    (async () => {
      try {
        const res = await repository.monthlyCalendar.getCalendarByMonth(
          `${props.date.getFullYear()}-${(props.date.getMonth() + 1).toString().padStart(2, '0')}`,
        );

        const data = res.data;

        setPeriodList(
          data
            .filter((item: IEvent) => item.type === 'period')
            .map((item: IEvent) => ({ ...item, className: 'period-event' })),
        );
        setRoutineList(
          data
            .filter((item: IEvent) => item.type === 'routine')
            .map((item: IEvent) => ({ ...item, className: 'routine-event' })),
        );
        setScheduleList(
          data
            .filter((item: IEvent) => item.type === 'schdule')
            .map((item: IEvent) => ({ ...item, className: 'schedule-event' })),
        );
        setTodoList(
          data
            .filter((item: IEvent) => item.type === 'todo')
            .map((item: IEvent) => ({ ...item, className: 'todo-event' })),
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, [props.date]);

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
      events={[...periodList, ...routineList, ...scheduleList, ...todoList]}
      dateClick={handleDateClick}
    />
  );
};

export default MonthlyCalendarContainer;
