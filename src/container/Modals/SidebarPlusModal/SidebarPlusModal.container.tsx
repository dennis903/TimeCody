import { type FC } from 'react';
import IconComponent from '@/components/Icon/Icon.component';

const SidebarPlusModalContainer: FC = () => {
  return (
    <div className="sidebar-modal-plus">
      <header className="sidebar-modal-header">
        <IconComponent icon="icon-close" />
        <IconComponent icon="icon-check-complete" />
      </header>
      <input
        className="sidebar-modal-plus-text"
        type="text"
        name="new"
        id="new"
        placeholder="새 카테고리 이름을 입력하세요"
      />
      <button className="sidebar-modal-delete-btn">삭제</button>
    </div>
  );
};

export default SidebarPlusModalContainer;
