import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, Text} from 'react-native';

interface Props {
  label: string;
}

const AuthInputLabel: FC<Props> = ({label}) => {
  return <Text style={styles.label}>{label}</Text>;
};

const styles = StyleSheet.create({
  label: {
    color: colors.CONTRAST,
  },
});

export default AuthInputLabel;
