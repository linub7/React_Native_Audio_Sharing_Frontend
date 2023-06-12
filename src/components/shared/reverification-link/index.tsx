import {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import AppLink from '@ui/links/app';
import colors from '@utils/colors';
import {reVerifyEmailHandler} from 'src/api/auth';
import {getAuthState} from 'src/store/auth';
import {ProfileNavigatorStackParamList} from 'src/@types/navigation';
import {generalError} from '@utils/constants';

interface Props {
  time?: number;
  activeAtFirst?: boolean;
  title: string;
  userId?: string;
}

const ReVerificationLink: FC<Props> = ({
  title,
  activeAtFirst = false,
  time = 60,
  userId,
}) => {
  const [countDown, setCountDown] = useState(time);
  const [canSendNewOtpReq, setCanSendNewOtpReq] = useState(activeAtFirst);

  const {profile} = useSelector(getAuthState);
  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

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

  const handleSendReverifyEmail = async () => {
    setCountDown(60);
    setCanSendNewOtpReq(false);

    if (!profile?.id)
      return Toast.show({
        type: 'error',
        text1: generalError,
      });
    const {err, data} = await reVerifyEmailHandler(userId || profile?.id);

    if (err) {
      return Toast.show({type: 'error', text1: err});
    }
    Toast.show({type: 'success', text1: data?.message});
    navigate('verify-email', {
      userInfo: {
        email: profile?.email,
        name: profile?.name,
        id: userId || profile?.id,
      },
    });
  };

  return (
    <View style={styles.container}>
      {countDown > 0 && !canSendNewOtpReq && (
        <Text style={styles.timer}>{countDown} seconds</Text>
      )}
      <AppLink
        title={title}
        onPress={handleSendReverifyEmail}
        active={canSendNewOtpReq}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timer: {
    color: colors.SECONDARY,
    marginRight: 8,
  },
});

export default ReVerificationLink;
