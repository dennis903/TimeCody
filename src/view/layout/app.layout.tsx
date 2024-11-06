import { type FC } from 'react';

interface IAppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<IAppLayoutProps> = (props) => {
  return <div id="wrap">{props.children}</div>;
};

export default AppLayout;
