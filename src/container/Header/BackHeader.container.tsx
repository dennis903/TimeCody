import { type FC, useState } from 'react';
import SidebarContainer from '../Sidebar/Sidebar.container';
import IconComponent from '../../components/Icon/Icon.component';
import AdditionalModal from '../Modals/AdditionalModal/AdditionalModal.container';

import useModalStore from '@/store/modal.store';

interface IBackHeaderContainerProps {
  date: Date;
  setDate: (date: Date) => void;
}

const BackHeaderContainer: FC<IBackHeaderContainerProps> = (props) => {
  const year = props.date.getFullYear();
  const month = props.date.getMonth() + 1;
  const day = props.date.getDate();

  const [isSidebarShow, setIsSidebarShow] = useState(false);
  const { toggleModal } = useModalStore();
  const [isAdditionalModalOpen, setIsAdditionalModalOpen] = useState(false);

  const handlePlusClick = () => {
    setIsAdditionalModalOpen(true);
    toggleModal(true);
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
              <h2 className="back__title">일정 관리</h2>
            </div>
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
              <h2 className="calendar-info__title">{`${year}년 ${month}월 ${day}일`}</h2>
              <button
                type="button"
                className="icon-btn"
                onClick={() => props.setDate(new Date(props.date.getFullYear(), props.date.getMonth() + 1, 1))}
              >
                <IconComponent icon="icon-arrow-right" />
              </button>
              <button type="button" className="icon-btn" onClick={handlePlusClick}>
                <IconComponent icon="icon-plus" />
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
        <div className="edit">
          <div className="edit-left"></div>
          <div className="edit-right">
            <button type="button" className="btn edit-btn">
              <span className="edit-order">순서 편집</span>
              <i className="icon icon-order"></i>
            </button>
          </div>
        </div>
      </header>
      <SidebarContainer isSidebarShow={isSidebarShow} setIsSidebarShow={setIsSidebarShow} />
      {isAdditionalModalOpen && <AdditionalModal date={props.date} />}
    </>
  );
};

export default BackHeaderContainer;
