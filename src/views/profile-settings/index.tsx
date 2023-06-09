import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

import AppHeader from '@components/profile/app-header';
import colors from '@utils/colors';
import {signoutHandler} from 'src/api/auth';
import {
  Keys,
  clearAsyncStorage,
  getFromAsyncStorage,
} from '@utils/asyncStorage';
import {useDispatch} from 'react-redux';
import {loggedOutAction} from 'src/store/auth';
import ProfileSettingsLogout from '@components/profile-settings/logout';
import ProfileSettingsInfo from '@components/profile-settings/info';

interface Props {}

const ProfileSettingsScreen: FC<Props> = props => {
  const dispatch = useDispatch();

  const handleLogout = async (fromAll?: boolean) => {
    const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
    if (!token) return;

    if (fromAll) {
      const {err, data} = await signoutHandler('yes', token);
      if (err) {
        return Toast.show({
          type: 'success',
          text1: err,
        });
      }
    } else {
      const {err, data} = await signoutHandler(undefined, token);
      if (err) {
        return Toast.show({
          type: 'success',
          text1: err,
        });
      }
    }
    await clearAsyncStorage();
    dispatch(loggedOutAction());
    Toast.show({
      type: 'success',
      text1: 'Take care, and I hope to see you soon!',
    });
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Profile > Settings" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Settings</Text>
      </View>
      <ProfileSettingsInfo />
      <ProfileSettingsLogout handleLogout={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SECONDARY,
    paddingBottom: 5,
    marginTop: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.SECONDARY,
  },
});

export default ProfileSettingsScreen;
