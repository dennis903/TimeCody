import { type FC } from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(undefined);

interface IconComponentProps {
  icon: string;
}

const IconComponent: FC<IconComponentProps> = (props) => {
  return <i className={cx('icon', props.icon)} />;
};

export default IconComponent;
