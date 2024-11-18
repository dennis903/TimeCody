import { type FC } from 'react';

const HeaderContainer: FC = () => {
  return (
    <div>
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
  );
};

export default HeaderContainer;
