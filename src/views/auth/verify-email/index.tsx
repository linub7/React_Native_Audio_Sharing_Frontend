import AuthFormContainer from '@components/auth/form-container';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppButton from '@ui/app-button';
import OTPField from '@ui/auth/otp-field';
import AppLink from '@ui/links/app';
import colors from '@utils/colors';
import {FC, useEffect, useRef, useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import {AuthStackParamList} from 'src/@types/navigation';
import {reVerifyEmailHandler, verifyEmailHandler} from 'src/api/auth';

type Props = NativeStackScreenProps<AuthStackParamList, 'verify-email'>; // must be type! NOT interface!

const otpFields = new Array(6).fill('');

const VerifyEmail: FC<Props> = ({
  route: {
    params: {userInfo},
  },
}) => {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [countDown, setCountDown] = useState(60);
  const [canSendNewOtpReq, setCanSendNewOtpReq] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

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

  useEffect(() => {
    if (canSendNewOtpReq) return;

    const intervalId = setInterval(() => {
      setCountDown(prev => {
        if (prev <= 0) {
          setCanSendNewOtpReq(true);
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [canSendNewOtpReq]);

  const handlePaste = (value: string) => {
    if (value.length === 6) {
      Keyboard.dismiss();
      const newOtp = value.split('');
      setOtp([...newOtp]);
    }
  };

  const isValidOtp = otp.every(value => value.trim());

  const handleSubmit = async () => {
    if (!isValidOtp) return;
    setLoading(true);
    const token: string = otp.join('');
    const values = {
      token,
      userId: userInfo?.id,
    };

    const {err, data} = await verifyEmailHandler(values);
    if (err) {
      console.log(err);
      setLoading(false);
      return;
    }
    setLoading(false);
    navigation.navigate('signin');
  };

  const handleSendReverifyEmail = async () => {
    setCountDown(60);
    setCanSendNewOtpReq(false);

    const {err, data} = await reVerifyEmailHandler(userInfo?.id);

    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
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

      <AppButton btnTitle="Submit" onPress={handleSubmit} loading={loading} />

      <View style={styles.linkContainer}>
        {countDown > 0 && <Text style={styles.timer}>{countDown} seconds</Text>}
        <AppLink
          title="Re-send OTP"
          onPress={handleSendReverifyEmail}
          active={canSendNewOtpReq}
        />
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
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'flex-end',
  },
  timer: {
    color: colors.SECONDARY,
    marginRight: 8,
  },
});

export default VerifyEmail;
