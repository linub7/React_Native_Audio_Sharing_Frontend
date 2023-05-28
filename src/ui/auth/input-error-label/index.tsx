import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, Text} from 'react-native';

interface Props {
  errorLabel?: string;
}

const AuthInputErrorLabel: FC<Props> = props => {
  const {errorLabel} = props;
  return <Text style={styles.errorLabel}>{errorLabel}</Text>;
};

const styles = StyleSheet.create({
  errorLabel: {
    color: colors.ERROR,
  },
});

export default AuthInputErrorLabel;
