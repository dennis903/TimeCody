import { type FC } from 'react';

interface ICompleteSvgProps {
  color?: string;
}

const CompleteSvg: FC<ICompleteSvgProps> = (props) => {
  return (
    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 1L6 12L1 7"
        stroke={props.color ? props.color : '#d9d9d9'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CompleteSvg;
