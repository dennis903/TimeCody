import { type FC, useState, useEffect, useLayoutEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import repository from '@/repository';
import ModalComponent from '@/components/modal/Modal.component';
import IconComponent from '@/components/Icon/Icon.component';
import SwitchComponent from '@/components/switch/Switch.component';
import useDatePickerModalStore from '@/store/DatePickerModal.store';
import useAdditionalModalStore from '@/store/AdditionalModal.store';

import DatePickerModalContainer from '@/container/Modals/DatePickerModal/DatePickerModal.container';
import CategoryConfigContainer from '@/container/CategoryConfig/CategoryConfig.container';

import { type ICategory } from '@/types';

import './AdditionalModal.container.css';

const AdditionalModalContainer: FC = () => {
  const { additionalModalState, toggleAdditionalModal } = useAdditionalModalStore();
  const { datePickerModalState, toggleDatePickerModal, setStartDate, setEndDate } = useDatePickerModalStore();
  const [title, setTitle] = useState('');
  const [timeEnabled, setTimeEnabled] = useState(true);
  const [notiEnabled, setNotiEnabled] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  const formatFullDate = () => {
    const year = additionalModalState.date.getFullYear();
    const month = additionalModalState.date.getMonth() + 1;
    const date = additionalModalState.date.getDate();

    return `${year}년 ${month}월 ${date}일`;
  };

  const formatMonthDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}월 ${day}일`;
  };

  const formatTime = (date: Date) => {
    const hours24 = date.getHours();
    const hours = hours24 % 12 || 12;
    const minutes = date.getMinutes();
    const ampm = hours24 >= 12 ? '오후' : '오전';

    return `${ampm} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const { data: categoryData, isSuccess: isCategorySuccess } = useQuery({
    queryKey: ['sidebarCategory'],
    queryFn: async () => {
      try {
        const res = await repository.sidebar.getSidebarCategory();

        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <ModalComponent isOpen={additionalModalState.isOpen} onClose={() => toggleAdditionalModal(false)}>
        <div className="additional-modal">
          <header className="additional-modal__header">
            <div className="additional-modal__header-date">
              {formatFullDate()}
              <div className="additional-modal__header-btns">
                <button type="submit" className="icon-btn">
                  <IconComponent icon="icon-check-complete" />
                </button>
                <button type="button" className="icon-btn" onClick={() => toggleAdditionalModal(false)}>
                  <IconComponent icon="icon-close" />
                </button>
              </div>
            </div>
            <div className="additional-modal__header-items">
              <h2 className="additional-modal__header-item additional-modal__header-item--active">일정</h2>
              <h2 className="additional-modal__header-item">할 일</h2>
              <h2 className="additional-modal__header-item">구간</h2>
              <h2 className="additional-modal__header-item">습관</h2>
              <h2 className="additional-modal__header-item">일기</h2>
              <h2 className="additional-modal__header-item">메모</h2>
              <h2 className="additional-modal__header-item">첨부</h2>
              <h2 className="additional-modal__header-item">스티커</h2>
              <h2 className="additional-modal__header-item">배경</h2>
            </div>
          </header>
          <form className="addtional-modal__input">
            <input
              className="additional-modal__title"
              type="text"
              name="new"
              id="new"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요."
            />
            <input type="color" name="color" id="color" value={''} />
          </form>
          <div className="addtional-modal__date">
            <div className="additional-modal-start" onClick={() => toggleDatePickerModal(true, 'start')}>
              <span className="additional-modal-start__title">시작</span>
              <span className="additional-modal-start__date">{formatMonthDate(datePickerModalState.startDate)}</span>
              {timeEnabled && (
                <span className="additional-modal-start__time">{formatTime(datePickerModalState.startDate)}</span>
              )}
            </div>
            <IconComponent className="icon-btn" icon="icon-arrow" />
            <div className="additional-modal-end" onClick={() => toggleDatePickerModal(true, 'end')}>
              <span className="additional-modal-end__title">종료</span>
              <span className="additional-modal-end__date">{formatMonthDate(datePickerModalState.endDate)}</span>
              {timeEnabled && (
                <span className="additional-modal-end__time">{formatTime(datePickerModalState.endDate)}</span>
              )}
            </div>
          </div>
          <CategoryConfigContainer
            categoryList={categoryData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div className="additional-modal__settings">
            <div className="additional-modal__time">
              <div className="additional-modal__setting">
                <IconComponent icon="icon-time" />
                <span className="additional-modal__setting-title">시간</span>
                <SwitchComponent id="time" checked={timeEnabled} onChangeSwitch={() => setTimeEnabled(!timeEnabled)} />
              </div>
            </div>
            <div className="additional-modal__repetition">
              <IconComponent icon="icon-repetition" />
              <span className="additional-modal__setting-title">반복</span>
              <SwitchComponent id="repeat" />
            </div>
            <div className="additional-modal__notification">
              <div className="additional-modal__setting">
                <IconComponent icon="icon-bell" />
                <span className="additional-modal__setting-title">알림</span>
                <SwitchComponent id="noti" checked={notiEnabled} onChangeSwitch={() => setNotiEnabled(!notiEnabled)} />
              </div>
              {notiEnabled && (
                <div className="additional-modal__notification-time">
                  <span className="additional-modal__notification-time-title">08:00 AM</span>
                  <button type="button" className="icon-btn">
                    <IconComponent icon="icon-open" />
                  </button>
                </div>
              )}
            </div>
            <div className="additional-modal__dday">
              <IconComponent icon="icon-dday" />
              <span className="additional-modal__setting-title">D-DAY</span>
              <SwitchComponent id="dday" />
            </div>
            <div className="additional-modal__location">
              <IconComponent icon="icon-location" />
              <span className="additional-modal__setting-title">위치</span>
              <SwitchComponent id="location" />
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

      <DatePickerModalContainer timeEnabled={timeEnabled} />
    </>
  );
};

export default AdditionalModalContainer;
