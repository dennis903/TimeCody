import { type FC, useState, useEffect, useRef } from 'react';
import { match, P } from 'ts-pattern';
import IconComponent from '../../components/Icon/Icon.component';
import classNames from 'classnames/bind';
import SwitchComponent from '../../components/switch/Switch.component';
import SidebarPlusComponent from '@/components/sidebarplus/SidebarPlus.component';

const cx = classNames.bind(undefined);

interface ISidebarMenuContainerProps {
  id: number;
  title: string;
  isMoreOn: boolean;
  onOff?: boolean;
  subMenuList?: string[];
  setOnOffList: React.Dispatch<React.SetStateAction<{ id: number; onOff: boolean }[]>>;
  isEditOn?: boolean;
  setIsEditOn?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarMenuContainer: FC<ISidebarMenuContainerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
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
        {match(props)
          .with({ isMoreOn: true }, () => (
            <SwitchComponent
              id={props.title}
              checked={props.onOff}
              onChangeSwitch={() =>
                props.setOnOffList((prev) => {
                  return prev.map((onOff) => (onOff.id === props.id ? { id: onOff.id, onOff: !onOff.onOff } : onOff));
                })
              }
            />
          ))
          .with({ isMoreOn: false, subMenuList: P.when((list) => Array.isArray(list) && list.length > 0) }, () => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <button
                className={cx('open-btn', { 'open-btn--closed': !isOpen })}
                onClick={() => setIsOpen((prev) => !prev)}
                style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
              >
                <IconComponent icon="icon-open" />
              </button>
              {/* <button
                className={cx('open-btn', { 'open-btn--closed': !isOpen })}
                onClick={() => setIsOpen((prev) => !prev)}
                style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
              >
                <IconComponent icon="icon-plus" />
              </button> */}
            </div>
          ))
          .with({ isEditOn: true }, () => (
            <button
              className={cx('open-btn', { 'open-btn--closed': !isOpen })}
              onClick={() => setIsOpen((prev) => !prev)}
              style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
            >
              <IconComponent icon="icon-order-edit" />
            </button>
          ))
          .otherwise(() => null)}
      </div>
      {props.subMenuList && (
        <ul
          ref={subMenuListRef}
          className="sidebar-sub-list"
          style={{ height: 0, overflow: 'hidden', transition: 'all 0.3s ease-out' }}
        >
          <IconComponent icon="icon-modify" />
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
