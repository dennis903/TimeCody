import { type FC } from 'react';
import IconComponent from '@/components/Icon/Icon.component';
import HeaderUtilContainer from './HeaderUtil.container';

import useAdditionalModalStore from '@/store/AdditionalModal.store';

interface IHeader2ContainerProps {
  backTitle: string;
  date: Date;
  setDate: (date: Date) => void;
}

const Header2Container: FC<IHeader2ContainerProps> = (props) => {
  const year = props.date.getFullYear();
  const month = props.date.getMonth() + 1;
  const day = props.date.getDate();

  const { toggleAdditionalModal } = useAdditionalModalStore();

  const handlePlusClick = () => {
    toggleAdditionalModal(true);
  };

  return (
    <>
      <header className="header">
        <div className="header-contents">
          <div className="header-left">
            <div className="back">
              <a href="#" className="back__link">
                <i className="icon icon-back"></i>
              </a>
              <h2 className="back__title">{props.backTitle}</h2>
            </div>
          </div>
          <div className="calendar-nav">
            <p className="calendar-nav__description">내 캘린더</p>
            <div className="calendar-info">
              <button
                type="button"
                className="icon-btn"
                onClick={() =>
                  props.setDate(new Date(props.date.getFullYear(), props.date.getMonth(), props.date.getDate() - 1))
                }
              >
                <IconComponent icon="icon-arrow-left" />
              </button>
              <h2 className="calendar-info__title">{`${year}년 ${month}월 ${day}일`}</h2>
              <button
                type="button"
                className="icon-btn"
                onClick={() =>
                  props.setDate(new Date(props.date.getFullYear(), props.date.getMonth(), props.date.getDate() + 1))
                }
              >
                <IconComponent icon="icon-arrow-right" />
              </button>
              <button type="button" className="icon-btn" onClick={handlePlusClick}>
                <IconComponent icon="icon-plus" />
              </button>
            </div>
          </div>
          <div className="header-right">
            <HeaderUtilContainer />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header2Container;
