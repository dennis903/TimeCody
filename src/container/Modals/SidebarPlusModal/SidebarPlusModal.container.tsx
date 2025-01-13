import { type FC } from 'react';
import IconComponent from '@/components/Icon/Icon.component';
import ModalComponent from '@/components/modal/Modal.component';
import useSidebarModalStore from '@/store/SidebarModal.store';
import repository from '@/repository';

import './SidebarPlusModal.container.css';

const SidebarPlusModalContainer: FC = () => {
  const { sidebarModalState, toggleSidebarModal, setSidebarModalValue, setSidebarModalColor } = useSidebarModalStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSidebarModalValue(e.target.value);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSidebarModalColor(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const res = await repository.sidebar.putUpdateSidebarCategory({
        id: sidebarModalState.id,
        value: sidebarModalState.value,
        color: sidebarModalState.color,
      });

      toggleSidebarModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    sidebarModalState.isOpen && (
      <ModalComponent>
        <div className="sidebar-modal-plus">
          <header className="sidebar-modal__header">
            <button type="button" className="icon-btn" onClick={() => toggleSidebarModal(false)}>
              <IconComponent icon="icon-close" />
            </button>
            <button type="submit" className="icon-btn" onClick={handleUpdate}>
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
                value={sidebarModalState.value}
                placeholder={sidebarModalState.placeholder}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="color"
                name="color"
                id="color"
                value={sidebarModalState.color}
                onChange={(e) => handleChangeColor(e)}
              />
            </form>

            <button className="sidebar-modal__delete-btn">삭제</button>
          </div>
        </div>
      </ModalComponent>
    )
  );
};

export default SidebarPlusModalContainer;
