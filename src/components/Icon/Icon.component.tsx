import { type FC } from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(undefined);

interface IconComponentProps extends React.HTMLAttributes<HTMLElement> {
  icon: string;
  className?: string;
}

const IconComponent: FC<IconComponentProps> = (props) => {
  const { icon, className, ...rest } = props;
  return <i className={cx('icon', icon, className)} {...rest} />;
};

export default IconComponent;
