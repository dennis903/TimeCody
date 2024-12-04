import { type FC } from 'react';
import SidebarPlusModalContainer from '@/container/Modals/SidebarPlusModal/SidebarPlusModal.container';

interface IAppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<IAppLayoutProps> = (props) => {
  return (
    <div id="wrap">
      {props.children}
      <SidebarPlusModalContainer />
    </div>
  );
};

export default AppLayout;
