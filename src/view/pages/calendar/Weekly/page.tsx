import { type FC, useState } from 'react';
import AppLayout from '@/view/layout/app.layout';
import BackHeaderContainer from '@/container/Header/BackHeader.container';
import WeeklyCalendarContainer from '@/container/WeeklyCalendar/WeeklyCalendar.container';
import GnbContainer from '@/container/Gnb/Gnb.container';

const CalendarWeeklyPage: FC = () => {
  const [date, setDate] = useState(new Date());
  return (
    <AppLayout>
      <BackHeaderContainer date={date} setDate={setDate} />
      <main>
        <WeeklyCalendarContainer date={date} />
      </main>
      <footer className="footer">
        <GnbContainer />
      </footer>
    </AppLayout>
  );
};

export default CalendarWeeklyPage;
