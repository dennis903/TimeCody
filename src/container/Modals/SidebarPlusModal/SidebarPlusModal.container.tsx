import { type FC, useState, useEffect } from 'react';
import IconComponent from '@/components/Icon/Icon.component';
import ModalComponent from '@/components/modal/Modal.component';
import useSidebarModalStore from '@/store/SidebarModal.store';

import './SidebarPlusModal.container.css';

const SidebarPlusModalContainer: FC = () => {
  const { sidebarPlusState, toggleSidebarPlusModal, setSidebarPlusPlaceholder } = useSidebarModalStore();

  return (
    sidebarPlusState.isOpen && (
      <ModalComponent>
        <div className="sidebar-modal-plus">
          <header className="sidebar-modal__header">
            <button type="button" className="icon-btn" onClick={() => toggleSidebarPlusModal(false)}>
              <IconComponent icon="icon-close" />
            </button>
            <button type="button" className="icon-btn">
              <IconComponent icon="icon-check-complete" />
            </button>
          </header>
          <div className="sidebar-modal-plus__contents">
            <form className="sidebar-modal-plus__form">
              <input
                className="sidebar-modal-plus__input"
                type="text"
                name="new"
                id="new"
                value=""
                placeholder="새 카테고리 이름을 입력하세요"
              />
              <input type="color" name="color" id="color" />
            </form>

            <button className="sidebar-modal__delete-btn">삭제</button>
          </div>
        </div>
      </ModalComponent>
    )
  );
};

export default SidebarPlusModalContainer;
