import { type FC } from 'react';
import { createPortal } from 'react-dom';

import './Modal.component.css';

interface IModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void; // 모달 닫기 핸들러 추가
  zIndex?: number;
}

const ModalComponent: FC<IModalProps> = (props) => {
  if (!props.isOpen) return null; // isOpen이 false면 렌더링하지 않음

  return createPortal(
    <div
      className="modal"
      onClick={props.onClose} // 오버레이 클릭 시 모달 닫기
      style={{
        zIndex: props.zIndex || 10000,
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>,
    document.getElementById('globalModal') as Element,
  );
};

export default ModalComponent;
