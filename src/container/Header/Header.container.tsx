import { type FC, useState } from 'react';
import SidebarContainer from '../Sidebar/Sidebar.container';
import IconComponent from '../../components/Icon/Icon.component';

interface IHeaderContainerProps {
  date: Date;
  setDate: (date: Date) => void;
}

const HeaderContainer: FC<IHeaderContainerProps> = (props) => {
  const year = props.date.getFullYear();
  const month = props.date.getMonth() + 1;

  const [isSidebarShow, setIsSidebarShow] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-contents">
          <div className="header-left">
            <img src="/src/assets/img/Time-cody-logo.png" alt="타임코디 로고" className="logo2" />
          </div>
          <div className="calendar-nav">
            <p className="calendar-nav__description">내 캘린더</p>
            <div className="calendar-info">
              <button
                type="button"
                className="icon-btn"
                onClick={() => props.setDate(new Date(props.date.getFullYear(), props.date.getMonth() - 1, 1))}
              >
                <IconComponent icon="icon-arrow-left" />
              </button>
              <h2 className="calendar-info__title">{`${year}년 ${month}월`}</h2>
              <button
                type="button"
                className="icon-btn"
                onClick={() => props.setDate(new Date(props.date.getFullYear(), props.date.getMonth() + 1, 1))}
              >
                <IconComponent icon="icon-arrow-right" />
              </button>
            </div>
          </div>
          <div className="header-right">
            <div className="header-util">
              <button type="button" className="icon-btn">
                <IconComponent icon="icon-search" />
              </button>
              <button type="button" className="icon-btn" onClick={() => setIsSidebarShow(true)}>
                <IconComponent icon="icon-hamburger" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <SidebarContainer isSidebarShow={isSidebarShow} setIsSidebarShow={setIsSidebarShow} />
    </>
  );
};

export default HeaderContainer;
