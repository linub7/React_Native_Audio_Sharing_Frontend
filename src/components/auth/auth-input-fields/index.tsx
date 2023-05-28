import AuthInput from '@ui/auth/input';
import AuthInputLabel from '@ui/auth/input-label';
import {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  containerStyle?: StyleProp<ViewStyle>;
}

const AuthInputFields: FC<Props> = props => {
  const {
    label,
    placeholder,
    value,
    keyboardType,
    secureTextEntry,
    autoCapitalize,
    containerStyle,
    onChange,
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <AuthInputLabel label={label} />
      <AuthInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AuthInputFields;
