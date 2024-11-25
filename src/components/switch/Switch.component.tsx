import { type FC } from 'react';

interface ISwitchComponentProps {
  id: string;
  checked?: boolean;
  onChangeSwitch?: () => void;
}

const SwitchComponent: FC<ISwitchComponentProps> = (props) => {
  return (
    <div className="switch">
      <input
        type="checkbox"
        id={props.id}
        checked={props.checked}
        className="switch__checkbox"
        onChange={props.onChangeSwitch}
      />
      <label htmlFor={props.id} className="switch__slider" />
    </div>
  );
};

export default SwitchComponent;
