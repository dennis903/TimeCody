import { type FC, useState, useEffect, useRef } from 'react';
import { match, P } from 'ts-pattern';
import IconComponent from '../../components/Icon/Icon.component';
import classNames from 'classnames/bind';
import SwitchComponent from '../../components/switch/Switch.component';
import useSidebarModalStore from '@/store/SidebarModal.store';
import { Link } from 'react-router-dom';
import { Reorder } from 'framer-motion';

const cx = classNames.bind(undefined);

interface ISidebarMenuContainerProps {
  id: number;
  title: string;
  isMoreOn: boolean;
  onOff?: boolean;
  subMenuList?: {
    id: number;
    title: string;
    color: string;
  }[];
  setOnOffList: React.Dispatch<React.SetStateAction<{ id: number; onOff: boolean }[]>>;
  isEditOn?: boolean;
  isPlusOn: boolean;
  setIsEditOn?: React.Dispatch<React.SetStateAction<boolean>>;
  link?: string;
}

const SidebarMenuContainer: FC<ISidebarMenuContainerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const subMenuListRef = useRef<HTMLUListElement>(null);
  const [subMenuList, setSubMenuList] = useState<{ id: number; title: string; color: string }[]>(
    props.subMenuList || [],
  );
  const {
    toggleSidebarModal,
    setSidebarModalPlaceholder,
    setSidebarModalValue,
    setSidebarModalColor,
    setSidebarModalId,
    setSidebarModalEditType,
    setSidebarModalCurrentCategory,
  } = useSidebarModalStore();

  const onClickModifyBtn = (value: string, color: string, id: number) => {
    let type = '';

    switch (props.title) {
      case '카테고리':
        type = 'category';
        break;
      case '월간 캘린더':
        type = 'monthly';
        break;
      default:
        type = 'shared';
        break;
    }

    toggleSidebarModal(true);
    setSidebarModalValue(value);
    setSidebarModalColor(color);
    setSidebarModalId(id);
    setSidebarModalEditType('edit');
    setSidebarModalCurrentCategory(type);
  };

  const onClickPlusBtn = () => {
    let placeholder = '';
    let type = '';

    switch (props.title) {
      case '카테고리':
        placeholder = '새 카테고리를 입력하세요.';
        break;
      default:
        placeholder = '새 캘린더 제목을 입력하세요.';
        break;
    }

    switch (props.title) {
      case '카테고리':
        type = 'category';
        break;
      case '월간 캘린더':
        type = 'monthly';
        break;
      default:
        type = 'shared';
        break;
    }

    toggleSidebarModal(true);
    setSidebarModalValue('');
    setSidebarModalColor('#000');
    setSidebarModalPlaceholder(placeholder);
    setSidebarModalEditType('add');
    setSidebarModalCurrentCategory(type);
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
  }, [isOpen, subMenuList]);

  useEffect(() => {
    if (props.subMenuList) {
      setSubMenuList(props.subMenuList);
    }
  }, [props.subMenuList]);

  return (
    <div className="sidebar-menu-item">
      <div className="sidebar-menu__detail">
        {props.link ? (
          <Link to={props.link} style={{ color: '#343434' }}>
            <p className="sidebar__title">{props.title}</p>
          </Link>
        ) : (
          <p className="sidebar__title">{props.title}</p>
        )}
        {match(props)
          .with({ isMoreOn: true }, () => (
            <SwitchComponent
              id={props.title}
              checked={props.onOff}
              onChangeSwitch={() =>
                props.setOnOffList((prev) =>
                  prev.map((onOff) => (onOff.id === props.id ? { id: onOff.id, onOff: !onOff.onOff } : onOff)),
                )
              }
            />
          ))
          .with(
            {
              isMoreOn: false,
              isEditOn: false,
              subMenuList: P.when((list) => Array.isArray(list) && list.length > 0),
            },
            () => (
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
                    onClick={() => onClickPlusBtn()}
                    style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
                  >
                    <IconComponent icon="icon-plus" />
                  </button>
                )}
              </div>
            ),
          )
          .with({ isEditOn: true, subMenuList: P.when((list) => Array.isArray(list) && list.length > 0) }, () => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setIsOpen((prev) => !prev)}
                style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
              >
                <IconComponent icon="icon-open" />
              </button>

              <button
                className={cx('open-btn', { 'open-btn--closed': !isOpen })}
                style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
              >
                <IconComponent icon="icon-order-edit" />
              </button>
            </div>
          ))
          .with({ isEditOn: true }, () => (
            <button
              className={cx('open-btn', { 'open-btn--closed': !isOpen })}
              style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
            >
              <IconComponent icon="icon-order-edit" />
            </button>
          ))
          .otherwise(() => null)}
      </div>
      {subMenuList && (
        <ul
          ref={subMenuListRef}
          className="sidebar-sub-list"
          style={{ height: 0, overflow: 'hidden', transition: 'all 0.3s ease-out' }}
        >
          {!props.isEditOn ? (
            subMenuList.map((subMenu) => (
              <li key={subMenu.id} className="sidebar-sub-item">
                <div className="sidebar-sub-item__color" style={{ backgroundColor: subMenu.color }} />
                <p className="sidebar-sub__title">{subMenu.title}</p>
                {props.isPlusOn && (
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => onClickModifyBtn(subMenu.title, subMenu.color, subMenu.id)}
                  >
                    <IconComponent icon="icon-modify" />
                  </button>
                )}
              </li>
            ))
          ) : (
            <Reorder.Group axis="y" values={subMenuList} onReorder={setSubMenuList}>
              {subMenuList.map((subMenu) => (
                <Reorder.Item key={subMenu.id} value={subMenu}>
                  <li className="sidebar-sub-item">
                    <div className="sidebar-sub-item__color" style={{ backgroundColor: subMenu.color }} />
                    <p className="sidebar-sub__title">{subMenu.title}</p>
                    <button type="button" className="icon-btn">
                      <IconComponent icon="icon-order-edit" />
                    </button>
                  </li>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </ul>
      )}
    </div>
  );
};

export default SidebarMenuContainer;
