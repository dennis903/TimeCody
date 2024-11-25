import { type FC, useState, useEffect, useRef } from 'react';
import IconComponent from '../../components/Icon/Icon.component';
import classNames from 'classnames/bind';
import SwitchComponent from '../../components/switch/Switch.component';

const cx = classNames.bind(undefined);

interface ISidebarMenuContainerProps {
  title: string;
  isMoreOn: boolean;
  onOff: boolean;
  subMenuList?: string[];
}

const SidebarMenuContainer: FC<ISidebarMenuContainerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onOff, setOnOff] = useState(props.onOff);
  const subMenuListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (subMenuListRef.current) {
      subMenuListRef.current.style.height = isOpen ? `${subMenuListRef.current.scrollHeight}px` : '0';
    }
  }, [isOpen]);

  return (
    <li className="sidebar-menu-item">
      <div className="sidebar-menu__detail">
        <p className="sidebar__title">{props.title}</p>
        {props.isMoreOn && (
          <SwitchComponent id={props.title} checked={onOff} onChangeSwitch={() => setOnOff((prev) => !prev)} />
        )}
        {!props.isMoreOn && props.subMenuList && (
          <button
            className={cx('open-btn', { 'open-btn--closed': !isOpen })}
            onClick={() => setIsOpen((prev) => !prev)}
            style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
          >
            <IconComponent icon="icon-open" />
          </button>
        )}
      </div>
      {props.subMenuList && (
        <ul
          ref={subMenuListRef}
          className="sidebar-sub-list"
          style={{ height: 0, overflow: 'hidden', transition: 'all 0.3s ease-out' }}
        >
          {props.subMenuList.map((subMenu, index) => (
            <li key={index} className="sidebar-sub-item">
              <p className="sidebar-sub__title">{subMenu}</p>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarMenuContainer;
