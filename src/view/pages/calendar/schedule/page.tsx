import { type FC, useState } from 'react';
import AppLayout from '@/view/layout/app.layout';
import BackHeaderContainer from '@/container/Header/BackHeader.container';
import ScheduleCalendarContainer from '@/container/ScheduleCalendar/ScheduleCalendar.container';
import GnbContainer from '@/container/Gnb/Gnb.container';

const CalendarSchedulePage: FC = () => {
  const [date, setDate] = useState(new Date());
  return (
    <AppLayout>
      <BackHeaderContainer date={date} setDate={setDate} />
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
