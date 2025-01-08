import { type FC, useEffect, useState } from 'react';
import './Sidebar.container.css';
import IconComponent from '@/components/Icon/Icon.component';
import SidebarMenuContainer from '@/container/SidebarMenu/SidebarMenu.container';
import classNames from 'classnames/bind';
import { Reorder } from 'framer-motion';
import repository from '@/repository';

const cx = classNames.bind(undefined);

interface ISidebarContainerProps {
  isSidebarShow: boolean;
  setIsSidebarShow: (isSidebarShow: boolean) => void;
}

const SidebarContainer: FC<ISidebarContainerProps> = (props) => {
  const [isMoreOn, setIsMoreOn] = useState(false);
  const [isEditOn, setIsEditOn] = useState(false);
  const [isPlusOn, setIsPlusOn] = useState(false);
  const [sideMenuList, setSideMenuList] = useState([
    { id: 1, title: '카테고리', subMenuList: ['개인', '공부', '만남', '직장'], more: isMoreOn, onOff: true },
    {
      id: 2,
      title: '월간 캘린더',
      subMenuList: ['내 캘린더', '프로젝트'],
      more: isMoreOn,
      onOff: true,
      link: '/calendar',
    },
    { id: 3, title: '일정 관리', more: isMoreOn, onOff: true, link: '/calendar/schedule' },
    { id: 4, title: '주간 캘린더', more: isMoreOn, onOff: true, link: '/calendar/weekly' },
    { id: 5, title: '구간 캘린더', more: isMoreOn, onOff: true, link: '/calendar/period' },
    {
      id: 6,
      title: '공유 캘린더',
      subMenuList: ['팀 프로젝트', '직장', '공유 1', '공유 2'],
      more: isMoreOn,
      onOff: true,
      link: '/calendar/shearing',
    },
  ]);
  const [onOffList, setOnOffList] = useState(
    sideMenuList.map((sideMenu) => {
      return {
        id: sideMenu.id,
        onOff: sideMenu.onOff,
      };
    }),
  ); // [{id: 1, onOff: true}, {id: 2, onOff: true}, ...]

  const onClickStoreBtn = () => {
    setSideMenuList((prev) =>
      prev.map((sideMenu) => {
        const onOff = !!onOffList.find((onOff) => onOff.id === sideMenu.id)?.onOff; // true or false or undefined

        return {
          ...sideMenu,
          onOff,
        };
      }),
    );

    setIsMoreOn(false);
  };

  const onClickMoreBtn = () => {
    setIsMoreOn((prev) => {
      if (prev) {
        // 복사본 => 원상 복구 시킨다.
        setOnOffList(
          sideMenuList.map((sideMenu) => {
            return {
              id: sideMenu.id,
              onOff: sideMenu.onOff,
            };
          }),
        );
      }

      return !prev;
    });
  };

  const onClickEditBtn = () => {
    setIsEditOn((prev) => !prev);
    setIsPlusOn(false);
    setIsMoreOn(false);
  };

  const onClickPlusBtn = () => {
    setIsEditOn(false);
    setIsPlusOn((prev) => !prev);
  };

  const onClickCloseBtn = () => {
    setIsEditOn(false);
    setIsMoreOn(false);
    setIsPlusOn(false);
    props.setIsSidebarShow(false);
  };

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

  useEffect(() => {
    (async () => {
      try {
        const res = await repository.sidebar.getSidebarCategory();

        const data = res.data;

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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
              {!isMoreOn && (
                <button type="button" className="sidebar-btn sidebar-plus-btn" onClick={onClickPlusBtn}>
                  <IconComponent icon="icon-plus" />
                </button>
              )}

              <button type="button" className="sidebar-btn sidebar-detail-btn" onClick={onClickMoreBtn}>
                <IconComponent icon="icon-detail" />
              </button>
            </div>
            <div className="sidebar-header-right">
              <button type="button" className="sidebar-btn sidebar-close-btn" onClick={onClickCloseBtn}>
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
              {!isMoreOn && (
                <button type="button" className="btn edit-btn" onClick={onClickEditBtn}>
                  <span className="edit-order">순서 편집</span>
                  <IconComponent icon="icon-order" />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="sidebar-main">
          {isEditOn && (
            <Reorder.Group axis="y" values={sideMenuList} onReorder={setSideMenuList}>
              {sideMenuList.map((sideMenu) => (
                <Reorder.Item key={sideMenu.id} value={sideMenu}>
                  <SidebarMenuContainer
                    key={sideMenu.id}
                    id={sideMenu.id}
                    title={sideMenu.title}
                    subMenuList={sideMenu?.subMenuList}
                    isMoreOn={isMoreOn}
                    onOff={onOffList.find((onOff) => onOff.id === sideMenu.id)?.onOff}
                    setOnOffList={setOnOffList}
                    isEditOn={isEditOn}
                    isPlusOn={isPlusOn}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
          <ul className="sidebar-menu-list">
            {sideMenuList
              .filter((sideMenu) => {
                if (sideMenu.more) {
                  return true;
                }

                if (isEditOn) {
                  return false;
                }

                if (sideMenu.onOff || isEditOn) {
                  return true;
                } else {
                  return false;
                }
              })
              .map((sideMenu) => (
                <SidebarMenuContainer
                  key={sideMenu.id}
                  id={sideMenu.id}
                  title={sideMenu.title}
                  subMenuList={sideMenu?.subMenuList}
                  isMoreOn={isMoreOn}
                  onOff={onOffList.find((onOff) => onOff.id === sideMenu.id)?.onOff} // true or false
                  setOnOffList={setOnOffList} // onOff 복사본 값 바꿀라고
                  isEditOn={isEditOn}
                  isPlusOn={isPlusOn}
                  link={sideMenu?.link}
                />
              ))}
          </ul>
        </div>
        {isMoreOn && (
          <button type="button" className="complete-btn" onClick={onClickStoreBtn}>
            저장
          </button>
        )}
      </div>
    </div>
  );
};

export default SidebarContainer;
