import CircleUI from '@ui/circle';
import {FC} from 'react';

interface Props {}

const CirclesComponent: FC<Props> = props => {
  return (
    <>
      <CircleUI position="top-right" size={200} />
      <CircleUI position="top-left" size={100} />
      <CircleUI position="bottom-right" size={100} />
      <CircleUI position="bottom-left" size={200} />
    </>
  );
};

export default CirclesComponent;
