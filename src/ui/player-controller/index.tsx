import {FC, ReactNode} from 'react';
import {Pressable} from 'react-native';

import colors from '@utils/colors';

interface Props {
  size?: number;
  children: ReactNode;
  ignoreContainer?: boolean;
  onPress?(): void;
}

const PlayerController: FC<Props> = ({
  size = 45,
  children,
  ignoreContainer,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ignoreContainer ? 'transparent' : colors.CONTRAST,
      }}>
      {children}
    </Pressable>
  );
};

export default PlayerController;
