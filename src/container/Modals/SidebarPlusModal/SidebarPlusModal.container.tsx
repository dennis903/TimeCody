import { useEffect, type FC } from 'react';
import IconComponent from '@/components/Icon/Icon.component';
import ModalComponent from '@/components/modal/Modal.component';
import useModalStore from '@/store/modal.store';

import './SidebarPlusModal.container.css';

const SidebarPlusModalContainer: FC = () => {
  const { sidebarPlusState } = useModalStore();

  return (
    <ModalComponent>
      <div className="sidebar-modal-plus">
        <header className="sidebar-modal__header">
          <button type="button" className="icon-btn">
            <IconComponent icon="icon-close" />
          </button>
          <button type="button" className="icon-btn">
            <IconComponent icon="icon-check-complete" />
          </button>
        </header>
        <div className="sidebar-modal-plus__contents">
          <input
            className="sidebar-modal-plus__input"
            type="text"
            name="new"
            id="new"
            placeholder="새 카테고리 이름을 입력하세요"
          />
          <button className="sidebar-modal__delete-btn">삭제</button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default SidebarPlusModalContainer;
