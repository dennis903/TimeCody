import { type FC } from 'react';

import classNames from 'classnames/bind';
import { useLocation, Link } from 'react-router-dom';

const cx = classNames.bind(undefined);

const NavigationContainer: FC = () => {
  const { pathname } = useLocation();
  const navList = [
    {
      id: 1,
      icon: 'icon-diary',
      imageUrl: '/src/assets/img/icon/diary.png',
      title: '다이어리',
      link: '#',
      isActive: pathname === '/diary',
    },
    {
      id: 2,
      icon: 'icon-todo',
      imageUrl: '/src/assets/img/icon/todo.png',
      title: '할 일',
      link: '#',
      isActive: pathname === '/todo',
    },
    {
      id: 3,
      icon: 'icon-calendar',
      imageUrl: '/src/assets/img/icon/calendar.png',
      title: '캘린더',
      link: '/calendar',
      isActive: pathname === '/calendar',
    },
    {
      id: 4,
      icon: 'icon-planner',
      imageUrl: '/src/assets/img/icon/planner.png',
      title: '계획표',
      link: '#',
      isActive: pathname === '/planner',
    },
    {
      id: 5,
      icon: 'icon-store',
      imageUrl: '/src/assets/img/icon/store.png',
      title: '스토어',
      link: '#',
      isActive: pathname === '/store',
    },
  ];

  return (
    <div className="navigation">
      <nav className="gnb">
        <ul className="gnb-list">
          {navList.map((navItem) => (
            <li
              key={navItem.id}
              className={cx('gnb-item', {
                'gnb-item--active': navItem.isActive,
              })}
            >
              <Link to={navItem.link} className="gnb-item__link">
                <i className={cx('icon', navItem.icon)}>
                  <img src={navItem.imageUrl} />
                </i>
                {navItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationContainer;
