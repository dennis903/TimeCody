import { type FC } from 'react';
import { createPortal } from 'react-dom';

import './Modal.component.css';

interface IModalProps {
  children: React.ReactNode;
}

const ModalComponent: FC<IModalProps> = (props) => {
  return createPortal(<div className="modal">{props.children}</div>, document.getElementById('globalModal') as Element);
};

export default ModalComponent;
