import colors from '@utils/colors';
import {FC} from 'react';
import {ActivityIndicator} from 'react-native';

interface Props {
  color?: string;
}

const CustomLoader: FC<Props> = ({color = colors.CONTRAST}) => {
  return <ActivityIndicator color={color} size={24} />;
};

export default CustomLoader;
