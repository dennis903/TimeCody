import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css';

function CalendarPage() {
  return (
    <div>
      <div className="header">
        <div className="header-contents">
          <div className="header-left">
            <img src="/src/assets/img/Time-cody-logo.png" alt="타임코디 로고" className="logo2" />
          </div>
          <div className="calendar-nav">
            <p className="calendar-nav__description">내 캘린더</p>
            <div className="calendar-info">
              <button type="button" className="icon-btn">
                <i className="icon icon-arrow-left">
                  <img src="/src/assets/img/icon/arrow-left.png" />
                </i>
              </button>
              <h2 className="calendar-info__title">2023년 12월</h2>
              <button type="button" className="icon-btn">
                <i className="icon icon-arrow-right">
                  <img src="/src/assets/img/icon/arrow-right.png" />
                </i>
              </button>
            </div>
          </div>
          <div className="header-right">
            <div className="header-util">
              <button type="button" className="icon-btn">
                <i className="icon icon-search">
                  <img src="/src/assets/img/icon/search.png" />
                </i>
              </button>
              <button type="button" className="icon-btn">
                <i className="icon icon-hamburger">
                  <img src="/src/assets/img/icon/hamburger.png" />
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="calendar">
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </div>
      <div className="footer">
        <nav className="gnb">
          <ul className="gnb-list">
            <li className="gnb-item">
              <a href="#" className="gnb-item__link">
                <i className="icon icon-diary">
                  <img src="/src/assets/img/icon/diary.png" />
                </i>
                다이어리
              </a>
            </li>
            <li className="gnb-item">
              <a href="#" className="gnb-item__link">
                <i className="icon icon-todo">
                  <img src="/src/assets/img/icon/todo.png" />
                </i>
                할 일
              </a>
            </li>
            <li className="gnb-item">
              <a href="#" className="gnb-item__link">
                <i className="icon icon-calendar">
                  <img src="/src/assets/img/icon/calendar.png" />
                </i>
                캘린더
              </a>
            </li>
            <li className="gnb-item">
              <a href="#" className="gnb-item__link">
                <i className="icon icon-planner">
                  <img src="/src/assets/img/icon/planner.png" />
                </i>
                계획표
              </a>
            </li>
            <li className="gnb-item">
              <a href="#" className="gnb-item__link">
                <i className="icon icon-store">
                  <img src="/src/assets/img/icon/store.png" />
                </i>
                스토어
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default CalendarPage;
