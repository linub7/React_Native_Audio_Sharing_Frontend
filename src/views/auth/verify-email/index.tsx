import AuthFormContainer from '@components/auth/form-container';
import AppButton from '@ui/app-button';
import OTPField from '@ui/auth/otp-field';
import AppLink from '@ui/links/app';
import {FC, useEffect, useRef, useState} from 'react';
import {Keyboard, StyleSheet, TextInput, View} from 'react-native';

interface Props {}

const otpFields = new Array(6).fill('');

const VerifyEmail: FC<Props> = props => {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef<TextInput>(null);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];

    if (value === 'Backspace') {
      // moves to the previous only if the field is empty
      if (!newOtp[index]) setActiveOtpIndex(index - 1);
      newOtp[index] = '';
    } else {
      // update otp and move to the next
      setActiveOtpIndex(index + 1);
      newOtp[index] = value;
    }
    setOtp([...newOtp]);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  const handlePaste = (value: string) => {
    if (value.length === 6) {
      Keyboard.dismiss();
      const newOtp = value.split('');
      setOtp([...newOtp]);
    }
  };

  const handleSubmit = () => {
    console.log(otp);
  };

  return (
    <AuthFormContainer heading="Please look at your email.">
      <View style={styles.inputContainer}>
        {otpFields.map((_, index) => {
          return (
            <OTPField
              ref={activeOtpIndex === index ? inputRef : null}
              key={index}
              placeholder="*"
              keyboardType="numeric"
              onChangeText={handlePaste}
              onKeyPress={({nativeEvent}) => {
                handleChange(nativeEvent.key, index);
              }}
              value={otp[index] || ''}
            />
          );
        })}
      </View>

      <AppButton btnTitle="Submit" onPress={handleSubmit} />

      <View style={styles.linkContainer}>
        <AppLink title="Re-send OTP" />
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  linkContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'flex-end',
  },
});

export default VerifyEmail;
