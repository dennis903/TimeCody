import { type FC, useState } from 'react';
import AppLayout from '@/view/layout/app.layout';
import Header2Container from '@/container/Header/Header2.container';
import WeeklyCalendarContainer from '@/container/WeeklyCalendar/WeeklyCalendar.container';
import GnbContainer from '@/container/Gnb/Gnb.container';

const CalendarWeeklyPage: FC = () => {
  const [date, setDate] = useState(new Date());
  return (
    <AppLayout>
      <Header2Container backTitle="주간 보기" date={date} setDate={setDate} />
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
