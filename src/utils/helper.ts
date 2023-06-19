import {PermissionsAndroid, Platform} from 'react-native';
import formatDuration from 'format-duration';

export const getSource = (poster?: string) =>
  poster ? {uri: poster} : require('../assets/music.png');

export const getPermissionToReadImages = async () => {
  if (Platform.OS === 'android')
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
};

export const formattedDuration = (duration = 0) =>
  formatDuration(duration, {leading: true});

let timeoutId: number;
export const debounce = (fun: Function, delay: number) => {
  return (...args: any) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fun.apply(null, args);
    }, delay);
  };
};
