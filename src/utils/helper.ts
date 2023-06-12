import {PermissionsAndroid, Platform} from 'react-native';

export const getSource = (poster?: string) =>
  poster ? {uri: poster} : require('../assets/music.png');

export const getPermissionToReadImages = async () => {
  if (Platform.OS === 'android')
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
};
