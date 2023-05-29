import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';

interface Props {
  btnTitle: string;
  onPress?(): void;
}

const AppButton: FC<Props> = ({btnTitle, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{btnTitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 18,
  },
});

export default AppButton;
