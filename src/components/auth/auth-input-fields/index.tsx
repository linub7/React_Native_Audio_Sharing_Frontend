import AuthInput from '@ui/auth/input';
import AuthInputErrorLabel from '@ui/auth/input-error-label';
import AuthInputLabel from '@ui/auth/input-label';
import {useFormikContext} from 'formik';
import {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  name: string; // required for formik
  label: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  containerStyle?: StyleProp<ViewStyle>;
}

const AuthInputFields: FC<Props> = props => {
  const {handleChange, values, errors, handleBlur, touched} = useFormikContext<{
    [key: string]: string;
  }>();

  const {
    label,
    placeholder,
    keyboardType,
    secureTextEntry,
    autoCapitalize,
    containerStyle,
    name,
  } = props;

  const errorMessage = touched[name] && errors[name] ? errors[name] : '';

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <AuthInputLabel label={label} />
        <AuthInputErrorLabel errorLabel={errorMessage} />
      </View>
      <AuthInput
        placeholder={placeholder}
        value={values[name]}
        onChangeText={handleChange(name)}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        onBlur={handleBlur(name)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
});

export default AuthInputFields;
