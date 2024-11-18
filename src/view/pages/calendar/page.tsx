import { type FC, useState } from 'react';

import MonthlyCalendarContainer from '../../../container/MonthlyCalendar/MonthlyCalendar.container';
import HeaderContainer from '../../../container/MonthlyCalendar/Header.container';
import NavigationContainer from '../../../container/MonthlyCalendar/Navigation.container';

const CalendarPage: FC = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <div className="header">
        <HeaderContainer date={date} setDate={setDate} />
      </div>
      <div className="calendar">
        <MonthlyCalendarContainer date={date} />
      </div>
      <div className="footer">
        <NavigationContainer />
      </div>
    </div>
  );
};

export default CalendarPage;
