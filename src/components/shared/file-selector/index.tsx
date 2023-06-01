import colors from '@utils/colors';
import {FC} from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  iconName: string;
  btnTitle: string;
  onPress?(): void;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const FileSelectorComponent: FC<Props> = ({
  iconName,
  btnTitle,
  onPress,
  color = colors.SECONDARY,
  size = 35,
  style,
}) => {
  return (
    <Pressable style={[styles.btnContainer, style]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialComIcon name={iconName} size={size} color={color} />
      </View>
      <Text style={styles.btnTitle}>{btnTitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 70,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    color: colors.CONTRAST,
    marginTop: 5,
  },
});

export default FileSelectorComponent;
