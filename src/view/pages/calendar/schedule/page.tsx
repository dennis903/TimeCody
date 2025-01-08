import { type FC, useState } from 'react';
import AppLayout from '@/view/layout/app.layout';
import Header2Container from '@/container/Header/Header2.container';
import ScheduleCalendarContainer from '@/container/ScheduleCalendar/ScheduleCalendar.container';
import GnbContainer from '@/container/Gnb/Gnb.container';

const CalendarSchedulePage: FC = () => {
  const [date, setDate] = useState(new Date());
  return (
    <AppLayout>
      <Header2Container backTitle="일정 관리" date={date} setDate={setDate} />
      <main>
        <ScheduleCalendarContainer date={date} />
      </main>
      <footer className="footer">
        <GnbContainer />
      </footer>
    </AppLayout>
  );
};

export default CalendarSchedulePage;
