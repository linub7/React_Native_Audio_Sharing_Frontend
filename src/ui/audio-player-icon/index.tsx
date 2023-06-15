import {FC} from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  name: string;
  size: number;
  color: string;
  onPress?(): void;
  containerStyle: StyleProp<ViewStyle>;
}

const AudioPlayerIcon: FC<Props> = ({
  name,
  size,
  color,
  onPress,
  containerStyle,
}) => {
  return (
    <Pressable onPress={onPress} style={containerStyle}>
      <AntDesign name={name} size={size} color={color} />
    </Pressable>
  );
};

export default AudioPlayerIcon;
