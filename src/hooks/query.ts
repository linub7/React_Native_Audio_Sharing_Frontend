import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';

import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {AudioDataResponse} from 'src/@types/audio';
import {RecentlyPlayedDataResponse} from 'src/@types/history';
import {Playlist} from 'src/@types/playlist';
import {getLatestUploadsHandler} from 'src/api/audio';
import catchAsyncError from 'src/api/catchError';
import {getMyFavoritesHandler} from 'src/api/favorite';
import {getMyHistoryHandler} from 'src/api/history';
import {getMyPlaylistsHandler} from 'src/api/playlist';
import {
  getRecommendedAudiosByProfileHandler,
  getUploadsByProfileHandler,
} from 'src/api/profile';
import {updateNotificationAction} from 'src/store/notification';

// =====> getLatestUploads <===== //
const handleGetLatestUploads = async (): Promise<AudioDataResponse[]> => {
  const {data} = await getLatestUploadsHandler();
  return data?.audios;
};
export const useFetchLatestAudios = () => {
  const dispatch = useDispatch();
  return useQuery(['latest-uploads'], {
    queryFn: () => handleGetLatestUploads(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(
        updateNotificationAction({type: 'error', message: errorMessage}),
      );
    },
  });
};
// ********************************* //

// =====> getRecommendedAudios <===== //
const handleGetRecommendedAudios = async (): Promise<AudioDataResponse[]> => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  const {data} = await getRecommendedAudiosByProfileHandler(
    token ? token : undefined,
  );
  return data?.audios;
};
export const useFetchRecommendedAudios = () => {
  const dispatch = useDispatch();
  return useQuery(['recommended-audios'], {
    queryFn: () => handleGetRecommendedAudios(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(
        updateNotificationAction({type: 'error', message: errorMessage}),
      );
    },
  });
};
// ********************************* //

// =====> getMyPlaylists <===== //
const handleGetMyPlaylists = async (): Promise<Playlist[]> => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  const {data} = await getMyPlaylistsHandler(
    '0',
    '10',
    token ? token : undefined,
  );
  return data?.playlists;
};
export const useFetchMyPlaylists = () => {
  const dispatch = useDispatch();
  return useQuery(['my-playlists'], {
    queryFn: () => handleGetMyPlaylists(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(
        updateNotificationAction({type: 'error', message: errorMessage}),
      );
    },
  });
};
// ********************************* //

// =====> getUploadsByProfile <===== //
const handleGetUploadsByProfile = async (): Promise<AudioDataResponse[]> => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  const {data} = await getUploadsByProfileHandler(
    '0',
    '10',
    token ? token : undefined,
  );
  return data?.audios;
};
export const useFetchUploadsByProfile = () => {
  const dispatch = useDispatch();
  return useQuery(['my-uploads'], {
    queryFn: () => handleGetUploadsByProfile(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(
        updateNotificationAction({type: 'error', message: errorMessage}),
      );
    },
  });
};
// ********************************* //

// =====> getHistoryByProfile <===== //
const handleGetHistoryByProfile = async (): Promise<
  RecentlyPlayedDataResponse[]
> => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  const {data} = await getMyHistoryHandler(token ? token : undefined);
  return data?.recentlyPlayed;
};
export const useFetchHistoryByProfile = () => {
  const dispatch = useDispatch();
  return useQuery(['my-history'], {
    queryFn: () => handleGetHistoryByProfile(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(
        updateNotificationAction({type: 'error', message: errorMessage}),
      );
    },
  });
};
// ********************************* //

// =====> getFavoritesByProfile <===== //
const handleGetFavoritesByProfile = async (): Promise<AudioDataResponse[]> => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  const {data} = await getMyFavoritesHandler(token ? token : undefined);
  return data?.audios;
};
export const useFetchFavoritesByProfile = () => {
  const dispatch = useDispatch();
  return useQuery(['my-favorites'], {
    queryFn: () => handleGetFavoritesByProfile(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(
        updateNotificationAction({type: 'error', message: errorMessage}),
      );
    },
  });
};
// ********************************* //
