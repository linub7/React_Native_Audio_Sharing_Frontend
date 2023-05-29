import AuthInput from '@ui/auth/input';
import AuthInputErrorLabel from '@ui/auth/input-error-label';
import AuthInputLabel from '@ui/auth/input-label';
import {useFormikContext} from 'formik';
import {FC, useEffect} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

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
  const inputTransformValue = useSharedValue(0);

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

  const shakeUI = () => {
    inputTransformValue.value = withSequence(
      withTiming(-10, {duration: 50}),
      withSpring(0, {
        damping: 8,
        mass: 0.5,
        stiffness: 1000,
        restDisplacementThreshold: 0.1,
      }),
    );
  };

  const inputStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: inputTransformValue.value}],
    };
  });

  useEffect(() => {
    if (errorMessage) shakeUI();
  }, [errorMessage]);

  return (
    <Animated.View style={[containerStyle, inputStyle]}>
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
});

export default AuthInputFields;
