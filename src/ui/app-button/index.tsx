import CustomLoader from '@ui/loader';
import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';

interface Props {
  btnTitle: string;
  onPress?(): void;
  loading?: boolean;
  borderRadius?: number;
}

const AppButton: FC<Props> = ({
  btnTitle,
  onPress,
  loading = false,
  borderRadius,
}) => {
  return (
    <Pressable
      style={[styles.container, {borderRadius: borderRadius || 25}]}
      onPress={onPress}>
      {loading ? (
        <CustomLoader />
      ) : (
        <Text style={styles.title}>{btnTitle}</Text>
      )}
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
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 18,
  },
});

export default AppButton;
