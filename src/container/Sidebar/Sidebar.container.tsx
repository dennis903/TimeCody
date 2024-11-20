import { type FC } from 'react';
import './Sidebar.container.css';
import IconComponent from '../../components/Icon/Icon.component';
import classNames from 'classnames/bind';

const cx = classNames.bind(undefined);

interface ISidebarContainerProps {
  isSidebarShow: boolean;
  setIsSidebarShow: (isSidebarShow: boolean) => void;
}

const SidebarContainer: FC<ISidebarContainerProps> = (props) => {
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
              <button type="button" className="sidebar-btn sidebar-detail-btn">
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
            <li className="sidebar-menu-item">
              <div className="sidebar-menu__detail">
                <p className="sidebar__title">카테고리</p>
                <button className="open-btn open-btn--closed">
                  <IconComponent icon="icon-open" />
                </button>
              </div>
              <ul className="sidebar-sub-list">
                <li className="sidebar-sub-item">
                  <p className="sidebar-sub__title">개인</p>
                </li>
                <li className="sidebar-sub-item">
                  <p className="sidebar-sub__title">공부</p>
                </li>
                <li className="sidebar-sub-item">
                  <p className="sidebar-sub__title">만남</p>
                </li>
                <li className="sidebar-sub-item">
                  <p className="sidebar-sub__title">직장</p>
                </li>
              </ul>
            </li>
            <li className="sidebar-menu-item">
              <div className="sidebar-menu__detail">
                <p className="sidebar__title">월간 캘린더</p>
                <button className="open-btn">
                  <IconComponent icon="icon-open" />
                </button>
              </div>
            </li>
            <li className="sidebar-menu-item">
              <div className="sidebar-menu__detail">
                <p className="sidebar__title">일정 관리</p>
              </div>
            </li>
            <li className="sidebar-menu-item">
              <div className="sidebar-menu__detail">
                <p className="sidebar__title">주간 캘린더</p>
              </div>
            </li>
            <li className="sidebar-menu-item">
              <div className="sidebar-menu__detail">
                <p className="sidebar__title">구간 캘린더</p>
                <button className="open-btn">
                  <IconComponent icon="icon-open" />
                </button>
              </div>
            </li>
            <li className="sidebar-menu-item">
              <div className="sidebar-menu__detail">
                <p className="sidebar__title">공유 캘린더</p>
                <button className="open-btn">
                  <IconComponent icon="icon-open" />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarContainer;
