import { type FC } from 'react';
import SidebarPlusModalContainer from '@/container/Modals/SidebarPlusModal/SidebarPlusModal.container';
import CalendarModalContainer from '@/container/Modals/CalendarModal/CalendarModal.container';
import AdditionalModalContainer from '@/container/Modals/AdditionalModal/AdditionalModal.container';

interface IAppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<IAppLayoutProps> = (props) => {
  return (
    <div id="wrap">
      {props.children}
      <SidebarPlusModalContainer />
      <CalendarModalContainer />
      <AdditionalModalContainer />
    </div>
  );
};

export default AppLayout;
