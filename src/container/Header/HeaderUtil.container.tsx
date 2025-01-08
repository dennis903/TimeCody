import { type FC, useState } from 'react';
import IconComponent from '@/components/Icon/Icon.component';
import SidebarContainer from '@/container/Sidebar/Sidebar.container';

interface IHeaderUtilProps {}

const HeaderUtilContainer: FC<IHeaderUtilProps> = (props) => {
  const [isSidebarShow, setIsSidebarShow] = useState(false);

  return (
    <>
      <div className="header-util">
        <button type="button" className="icon-btn">
          <IconComponent icon="icon-search" />
        </button>
        <button type="button" className="icon-btn" onClick={() => setIsSidebarShow(true)}>
          <IconComponent icon="icon-hamburger" />
        </button>
      </div>
      <SidebarContainer isSidebarShow={isSidebarShow} setIsSidebarShow={setIsSidebarShow} />
    </>
  );
};

export default HeaderUtilContainer;
