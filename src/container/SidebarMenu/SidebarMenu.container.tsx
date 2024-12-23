import { type FC, useState, useEffect, useRef } from 'react';
import { match, P } from 'ts-pattern';
import IconComponent from '../../components/Icon/Icon.component';
import classNames from 'classnames/bind';
import SwitchComponent from '../../components/switch/Switch.component';
import useSidebarModalStore from '@/store/SidebarModal.store';

const cx = classNames.bind(undefined);

interface ISidebarMenuContainerProps {
  id: number;
  title: string;
  isMoreOn: boolean;
  onOff?: boolean;
  subMenuList?: string[];
  setOnOffList: React.Dispatch<React.SetStateAction<{ id: number; onOff: boolean }[]>>;
  isEditOn?: boolean;
  isPlusOn: boolean;
  setIsEditOn?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarMenuContainer: FC<ISidebarMenuContainerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const subMenuListRef = useRef<HTMLUListElement>(null);
  const { toggleSidebarPlusModal, setSidebarPlusPlaceholder, setSidebarPlusValue } = useSidebarModalStore();

  const onClickModifyBtn = (value: string) => {
    toggleSidebarPlusModal(true);
    setSidebarPlusValue(value);
  };

  const onClickPlusBtn = (placeholder: string) => {
    toggleSidebarPlusModal(true);
    setSidebarPlusValue('');
    setSidebarPlusPlaceholder(placeholder);
  };

  useEffect(() => {
    if (props.isMoreOn) {
      setIsOpen(false);
    }
  }, [props.isMoreOn]);

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
                type="button"
                className="icon-btn"
                onClick={() => setIsOpen((prev) => !prev)}
                style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
              >
                <IconComponent icon="icon-open" />
              </button>

              {props.isPlusOn && (
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => onClickPlusBtn('새 카테고리를 입력하세요.')}
                  style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
                >
                  <IconComponent icon="icon-plus" />
                </button>
              )}
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
          {props.subMenuList.map((subMenu, index) => (
            <li key={index} className="sidebar-sub-item">
              <div className="sidebar-sub-item__color" style={{ backgroundColor: 'black' }} />
              <p className="sidebar-sub__title">{subMenu}</p>
              {props.isPlusOn && (
                <button type="button" className="icon-btn" onClick={() => onClickModifyBtn(subMenu)}>
                  <IconComponent icon="icon-modify" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarMenuContainer;
