import { type FC, useState } from 'react';

import MonthlyCalendarContainer from '../../../container/MonthlyCalendar/MonthlyCalendar.container';
import HeaderContainer from '../../../container/Header/Header.container';
import GnbContainer from '../../../container/Gnb/Gnb.container';

const CalendarPage: FC = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <HeaderContainer date={date} setDate={setDate} />
      <main>
        <MonthlyCalendarContainer date={date} />
      </main>
      <footer className="footer">
        <GnbContainer />
      </footer>
    </>
  );
};

export default CalendarPage;
