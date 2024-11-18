import MonthlyCalendarContainer from '../../../container/MonthlyCalendar/MonthlyCalendar.container';
import HeaderContainer from '../../../container/MonthlyCalendar/Header.container';
import NavigationContainer from '../../../container/MonthlyCalendar/Navigation.container';

function CalendarPage() {
  return (
    <div>
      <div className="header">
        <HeaderContainer />
      </div>
      <div className="calendar">
        <MonthlyCalendarContainer />
      </div>
      <div className="footer">
        <NavigationContainer />
      </div>
    </div>
  );
}

export default CalendarPage;
