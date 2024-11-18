import { type FC } from 'react';

const NavigationContainer: FC = () => {
  return (
    <div className="navigation">
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
  );
};

export default NavigationContainer;
