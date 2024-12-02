import { type FC } from 'react';
import IconComponent from '../Icon/Icon.component';
import './SidebarPlus.component.css';

const SidebarPlusComponent: FC = () => {
  return (
    <>
      <div className="header">
        <IconComponent icon="icon-close" />
        <IconComponent icon="icon-check-complete" />
      </div>
      <input className="text" type="text" name="new" id="new" placeholder="새 카테고리 이름을 입력하세요" />
      <button className="delete-btn">삭제</button>
    </>
  );
};

export default SidebarPlusComponent;
