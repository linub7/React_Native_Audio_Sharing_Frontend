import {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import deepEqual from 'deep-equal';
import ImagePicker from 'react-native-image-crop-picker';

import AppHeader from '@components/profile/app-header';
import colors from '@utils/colors';
import {signoutHandler} from 'src/api/auth';
import {
  Keys,
  clearAsyncStorage,
  getFromAsyncStorage,
} from '@utils/asyncStorage';
import {
  getAuthState,
  loggedOutAction,
  updateProfileAction,
} from 'src/store/auth';
import ProfileSettingsLogout from '@components/profile-settings/logout';
import ProfileSettingsInfo from '@components/profile-settings/info';
import AppButton from '@ui/app-button';
import {updateProfileHandler} from 'src/api/profile';
import CustomLoader from '@ui/loader';
import {getPermissionToReadImages} from '@utils/helper';

interface Props {}

interface ProfileInfo {
  name: string;
  avatar?: string;
}

const ProfileSettingsScreen: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState<ProfileInfo>({name: ''});
  const [loading, setLoading] = useState(false);

  const {profile} = useSelector(getAuthState);
  const dispatch = useDispatch();

  const isSame = deepEqual(userInfo, {
    name: profile?.name,
    avatar: profile?.avatar,
  });

  const handleChangeInput = (text: string) =>
    setUserInfo({...userInfo, name: text});

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

  const handleImageSelect = async () => {
    try {
      await getPermissionToReadImages();
      const {path} = await ImagePicker.openPicker({
        cropping: true,
        width: 300,
        height: 300,
      });
      setUserInfo({...userInfo, avatar: path});
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!userInfo.name.trim())
      return Toast.show({type: 'error', text1: 'Profile name is required'});

    setLoading(true);
    const formData = new FormData();
    formData.append('name', userInfo.name);
    if (userInfo.avatar) {
      formData.append('avatar', {
        name: 'avatar',
        type: 'image/jpeg',
        uri: userInfo.avatar,
      });
    }

    const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
    if (!token)
      return Toast.show({type: 'error', text1: 'OOPS! something went wrong!'});
    const {err, data} = await updateProfileHandler(formData, token);
    if (err) {
      setLoading(false);
      return Toast.show({type: 'error', text1: err});
    }
    dispatch(updateProfileAction({profile: data.user}));
    Toast.show({type: 'success', text1: 'Profile Updated Successfully.'});
    setLoading(false);
  };

  useEffect(() => {
    if (profile) setUserInfo({avatar: profile?.avatar, name: profile?.name});
  }, [profile]);

  return (
    <View style={styles.container}>
      <AppHeader title="Profile > Settings" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Settings</Text>
      </View>
      <ProfileSettingsInfo
        name={userInfo.name}
        email={profile?.email}
        verified={profile?.verified}
        avatar={userInfo.avatar}
        onChangeText={handleChangeInput}
        onPress={handleImageSelect}
      />
      <ProfileSettingsLogout handleLogout={handleLogout} />
      {!isSame && (
        <View style={styles.marginTop}>
          {loading ? (
            <CustomLoader color={colors.SECONDARY} />
          ) : (
            <AppButton
              btnTitle="Update Profile"
              borderRadius={7}
              onPress={handleUpdateProfile}
            />
          )}
        </View>
      )}
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
  marginTop: {
    marginTop: 15,
  },
});

export default ProfileSettingsScreen;
