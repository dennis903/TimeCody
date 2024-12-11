import { type FC, useState } from 'react';

import MonthlyCalendarContainer from '@/container/MonthlyCalendar/MonthlyCalendar.container';
import HeaderContainer from '@/container/Header/Header.container';
import GnbContainer from '@/container/Gnb/Gnb.container';
import AppLayout from '@/view/layout/app.layout';

const CalendarPage: FC = () => {
  const [date, setDate] = useState(new Date());

  return (
    <AppLayout>
      <HeaderContainer date={date} setDate={setDate} />
      <main>
        <MonthlyCalendarContainer date={date} />
      </main>
      <footer className="footer">
        <GnbContainer />
      </footer>
    </AppLayout>
  );
};

export default CalendarPage;
