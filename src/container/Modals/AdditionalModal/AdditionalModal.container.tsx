import { type FC } from 'react';
import ModalComponent from '@/components/modal/Modal.component';
import IconComponent from '@/components/Icon/Icon.component';

import './AdditionalModal.container.css';

import useAdditionalModalStore from '@/store/AdditionalModal.store';

const AdditionalModalContainer: FC = () => {
  const { additionalModalState, toggleAdditionalModal } = useAdditionalModalStore();

  const formatFullDate = () => {
    const year = additionalModalState.date.getFullYear();
    const month = additionalModalState.date.getMonth() + 1;
    const date = additionalModalState.date.getDate();

    return `${year}년 ${month}월 ${date}일`;
  };

  const formatMonthDate = () => {
    const month = additionalModalState.date.getMonth() + 1;
    const date = additionalModalState.date.getDate();

    return `${month}월 ${date}일`;
  };

  return (
    additionalModalState.isOpen && (
      <ModalComponent>
        <div className="additional-modal">
          <header className="additional-modal__header">
            <div className="additional-modal__header-date">
              {formatFullDate()}
              <button type="button" className="icon-btn" onClick={() => toggleAdditionalModal(false)}>
                <IconComponent icon="icon-close" />
              </button>
            </div>
            <div className="additional-modal__header-items">
              <h2 className="addtional-modal__header-item">일정</h2>
              <h2 className="addtional-modal__header-item">할 일</h2>
              <h2 className="addtional-modal__header-item">일기</h2>
              <h2 className="addtional-modal__header-item">메모</h2>
              <h2 className="addtional-modal__header-item">첨부</h2>
              <h2 className="addtional-modal__header-item">스티커</h2>
              <h2 className="addtional-modal__header-item">배경</h2>
            </div>
          </header>
          <form className="addtional-modal__input">
            <input type="text" className="additional-modal__title" placeholder="제목을 입력해주세요."></input>
            <button type="button" className="icon-btn">
              <IconComponent icon="icon-color" />
            </button>
          </form>
          <div className="addtional-modal__date">
            <div className="additional-modal-start">
              <span className="additional-modal-start__title">시작</span>
              <span className="additional-modal-start__date">{formatMonthDate()}</span>
              <span className="additional-modal-start__time">오전 9:00</span>
            </div>
            <IconComponent className="icon-btn" icon="icon-arrow" />
            <div className="additional-modal-end">
              <span className="additional-modal-end__title">종료</span>
              <span className="additional-modal-end__date">{formatMonthDate()}</span>
              <span className="additional-modal-end__time">오후 9:00</span>
            </div>
          </div>
          <div className="additional-modal__settings">
            <div className="additional-modal__category">
              <div className="additional-modal__category-list">
                <IconComponent icon="icon-list" />
                <h2 className="additional-modal__category-title">카테고리</h2>
              </div>
              <button type="button" className="icon-btn">
                <IconComponent icon="icon-open" />
              </button>
            </div>
            <div className="additional-modal__time">
              <div className="additional-modal__setting">
                <IconComponent icon="icon-time" />
                <span className="additional-modal__setting-title">시간</span>
              </div>
              <form className="additional-modal__time-form">
                <input type="checkbox" className="additional-modal__time-check" />
                <span className="additional-modal__allday">종일</span>
              </form>
            </div>
            <div className="additional-modal__repetition">
              <IconComponent icon="icon-repetition" />
              <span className="additional-modal__setting-title">반복</span>
            </div>
            <div className="additional-modal__notification">
              <div className="additional-modal__setting">
                <IconComponent icon="icon-bell" />
                <span className="additional-modal__setting-title">알림</span>
              </div>
              <div className="additional-modal__notification-time">
                <span className="additional-modal__notification-time-title">08:00 AM</span>
                <button type="button" className="icon-btn">
                  <IconComponent icon="icon-open" />
                </button>
              </div>
            </div>
            <div className="additional-modal__dday">
              <IconComponent icon="icon-dday" />
              <span className="additional-modal__setting-title">D-DAY</span>
            </div>
            <div className="additional-modal__location">
              <IconComponent icon="icon-location" />
              <span className="additional-modal__setting-title">위치</span>
            </div>
            <div className="additional-modal__attendee">
              <IconComponent icon="icon-attendee" />
              <span className="additional-modal__setting-title">참석자</span>
              <ul className="attendee-list">
                <li className="attendee-item">주아</li>
              </ul>
              <button type="button" className="icon-btn">
                <IconComponent icon="icon-additinal" />
              </button>
            </div>
            <div className="additional-modal__memo">
              <IconComponent icon="icon-memo" />
              <span className="additional-modal__setting-title">일정 메모</span>
            </div>
            <div className="additional-modal__link">
              <IconComponent icon="icon-link" />
              <span className="additional-modal__setting-title">내 캘린더</span>
              <button type="button" className="icon-btn">
                <IconComponent icon="icon-open" />
              </button>
            </div>
          </div>
        </div>
      </ModalComponent>
    )
  );
};

export default AdditionalModalContainer;
