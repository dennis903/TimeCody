import { type FC, useEffect, useState } from 'react';
import './Sidebar.container.css';
import IconComponent from '../../components/Icon/Icon.component';
import SidebarMenuContainer from '../SidebarMenu/SidebarMenu.container';
import classNames from 'classnames/bind';

const cx = classNames.bind(undefined);

interface ISidebarContainerProps {
  isSidebarShow: boolean;
  setIsSidebarShow: (isSidebarShow: boolean) => void;
}

const SidebarContainer: FC<ISidebarContainerProps> = (props) => {
  const [isMoreOn, setIsMoreOn] = useState(false);
  const [sideMenuList, setSideMenuList] = useState([
    { id: 1, title: '카테고리', subMenuList: ['일정 1', '일정 2'], more: isMoreOn, onOff: true },
    { id: 2, title: '월간 캘린더', more: isMoreOn, onOff: true },
    { id: 3, title: '일정 관리', more: isMoreOn, onOff: false },
    { id: 4, title: '주간 캘린더', more: isMoreOn, onOff: true },
    { id: 5, title: '구간 캘린더', more: isMoreOn, onOff: true },
    { id: 6, title: '공유 캘린더', more: isMoreOn, onOff: true },
  ]);

  useEffect(() => {
    setSideMenuList((prev) => {
      return prev.map((sideMenu) => {
        return {
          ...sideMenu,
          more: isMoreOn,
        };
      });
    });
  }, [isMoreOn]);

  return (
    <div
      className={cx('sidebar-wrapper', {
        'sidebar-wrapper--open': props.isSidebarShow,
      })}
    >
      <div
        className={cx('sidebar', {
          'sidebar--open': props.isSidebarShow,
        })}
      >
        <div className="sidebar-header">
          <div className="sidebar-header-btn">
            <div className="sidebar-header-left">
              <button type="button" className="sidebar-btn sidebar-plus-btn">
                <IconComponent icon="icon-plus" />
              </button>
              <button
                type="button"
                className="sidebar-btn sidebar-detail-btn"
                onClick={() => setIsMoreOn((prev) => !prev)}
              >
                <IconComponent icon="icon-detail" />
              </button>
            </div>
            <div className="sidebar-header-right">
              <button
                type="button"
                className="sidebar-btn sidebar-close-btn"
                onClick={() => props.setIsSidebarShow(false)}
              >
                <IconComponent icon="icon-close" />
              </button>
            </div>
          </div>
          <div className="sidebar-header-contents">
            <div className="sidebar-profile">
              <div className="sidebar-profile__img">
                <img src="/src/assets/img/icon/sidebar-profile.png" alt="사이드바-프로필" />
              </div>
              <span className="sidebar-username">주아</span>
            </div>
            <div className="sidebar-edit">
              <button type="button" className="btn edit-btn">
                <span className="edit-order">순서 편집</span>
                <IconComponent icon="icon-order" />
              </button>
            </div>
          </div>
        </div>
        <div className="sidebar-main">
          <ul className="sidebar-menu-list">
            {sideMenuList
              .filter((sideMenu) => {
                if (sideMenu.more) {
                  return true;
                }

                if (sideMenu.onOff) {
                  return true;
                } else {
                  return false;
                }
              })
              .map((sideMenu) => (
                <SidebarMenuContainer
                  key={sideMenu.id}
                  title={sideMenu.title}
                  subMenuList={sideMenu?.subMenuList}
                  isMoreOn={isMoreOn}
                  onOff={sideMenu.onOff}
                />
              ))}
          </ul>
        </div>
        {isMoreOn && <button type="button">저장</button>}
      </div>
    </div>
  );
};

export default SidebarContainer;
