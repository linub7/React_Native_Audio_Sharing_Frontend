import AuthInput from '@ui/auth/input';
import AuthInputErrorLabel from '@ui/auth/input-error-label';
import AuthInputLabel from '@ui/auth/input-label';
import {useFormikContext} from 'formik';
import {FC, ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  name: string; // required for formik
  label: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  containerStyle?: StyleProp<ViewStyle>;
  rightIcon?: ReactNode;
  onRightIconPress?(): void;
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
    rightIcon,
    onRightIconPress,
  } = props;

  const errorMessage = touched[name] && errors[name] ? errors[name] : '';

  return (
    <View style={containerStyle}>
      <View style={styles.labelContainer}>
        <AuthInputLabel label={label} />
        <AuthInputErrorLabel errorLabel={errorMessage} />
      </View>
      <View>
        <AuthInput
          placeholder={placeholder}
          value={values[name]}
          onChangeText={handleChange(name)}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          onBlur={handleBlur(name)}
        />
        {rightIcon ? (
          <Pressable onPress={onRightIconPress} style={styles.rightIcon}>
            {rightIcon}
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  rightIcon: {
    width: 45,
    height: 45,
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthInputFields;
