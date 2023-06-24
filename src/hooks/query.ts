import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';

import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {AudioDataResponse} from 'src/@types/audio';
import {HistoryByProfile, RecentlyPlayedDataResponse} from 'src/@types/history';
import {Playlist, PublicProfilePlaylistAudios} from 'src/@types/playlist';
import {getLatestUploadsHandler} from 'src/api/audio';
import catchAsyncError from 'src/api/catchError';
import {
  getIsFavoriteAudioHandler,
  getMyFavoritesHandler,
} from 'src/api/favorite';
import {
  getHistoryByProfileHandler,
  getMyRecentlyPlayedHistoryHandler,
} from 'src/api/history';
import {
  getAutoGeneratedPlaylistsHandler,
  getMyPlaylistsHandler,
} from 'src/api/playlist';
import {
  getPublicPlaylistAudiosHandler,
  getPublicProfileHandler,
  getPublicProfilePlaylistHandler,
  getPublicProfileUploadsHandler,
  getRecommendedAudiosByProfileHandler,
  getUploadsByProfileHandler,
} from 'src/api/profile';
import {updateNotificationAction} from 'src/store/notification';
import {PublicProfile} from 'src/@types/auth';

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

// =====> getMyRecentlyPlayedHistory <===== //
const handleGetMyRecentlyPlayedHistoryByProfile = async (): Promise<
  RecentlyPlayedDataResponse[]
> => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  const {data} = await getMyRecentlyPlayedHistoryHandler(
    token ? token : undefined,
  );
  return data?.recentlyPlayed;
};
export const useFetchGetMyRecentlyPlayedHistoryByProfile = () => {
  const dispatch = useDispatch();
  return useQuery(['my-recently-played-history'], {
    queryFn: () => handleGetMyRecentlyPlayedHistoryByProfile(),
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

// =====> getHistoriesByProfile <===== //
const handleGetHistoriesByProfile = async (): Promise<HistoryByProfile[]> => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  const {data} = await getHistoryByProfileHandler(
    '0',
    '10',
    token ? token : undefined,
  );
  return data?.histories;
};
export const useFetchHistoriesByProfile = () => {
  const dispatch = useDispatch();
  return useQuery(['my-histories'], {
    queryFn: () => handleGetHistoriesByProfile(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(
        updateNotificationAction({type: 'error', message: errorMessage}),
      );
    },
  });
};
// ********************************* //

// =====> getAutoGeneratedPlaylist <===== //
const handleGetAutoGeneratedPlaylist = async (): Promise<Playlist[]> => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  const {data} = await getAutoGeneratedPlaylistsHandler(
    token ? token : undefined,
  );
  return data?.playlist;
};
export const useFetchAutoGeneratedPlaylist = () => {
  const dispatch = useDispatch();
  return useQuery(['auto-generated-playlist'], {
    queryFn: () => handleGetAutoGeneratedPlaylist(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(
        updateNotificationAction({type: 'error', message: errorMessage}),
      );
    },
  });
};
// ********************************* //

// =====> getIsFavoriteAudio <===== //
const handleGetIsFavoriteAudio = async (audioId: string): Promise<boolean> => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  const {data} = await getIsFavoriteAudioHandler(
    audioId,
    token ? token : undefined,
  );
  return data?.result;
};
export const useFetchIsFavoriteAudio = (audioId: string) => {
  const dispatch = useDispatch();
  return useQuery(['is-favorite-audio', audioId], {
    queryFn: () => handleGetIsFavoriteAudio(audioId),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(
        updateNotificationAction({type: 'error', message: errorMessage}),
      );
    },
    enabled: audioId ? true : false,
  });
};
// ********************************* //

// =====> getPublicProfile <===== //
const handleGetPublicProfile = async (
  profileId: string,
): Promise<PublicProfile> => {
  const {data} = await getPublicProfileHandler(profileId);
  return data?.profile;
};
export const useFetchPublicProfile = (profileId: string) => {
  const dispatch = useDispatch();
  return useQuery(['public-profile', profileId], {
    queryFn: () => handleGetPublicProfile(profileId),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(
        updateNotificationAction({type: 'error', message: errorMessage}),
      );
    },
    enabled: profileId ? true : false,
  });
};
// ********************************* //

// =====> getPublicProfileUploads <===== //
const handleGetPublicProfileUploads = async (
  profileId: string,
): Promise<AudioDataResponse[]> => {
  const {data} = await getPublicProfileUploadsHandler('0', '10', profileId);
  return data?.audios;
};
export const useFetchPublicProfileUploads = (profileId: string) => {
  const dispatch = useDispatch();
  return useQuery(['public-profile-uploads', profileId], {
    queryFn: () => handleGetPublicProfileUploads(profileId),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(
        updateNotificationAction({type: 'error', message: errorMessage}),
      );
    },
    enabled: profileId ? true : false,
  });
};
// ********************************* //

// =====> getPublicProfilePlaylist <===== //
const handleGetPublicProfilePlaylist = async (
  profileId: string,
): Promise<Playlist[]> => {
  const {data} = await getPublicProfilePlaylistHandler('0', '10', profileId);
  return data?.playlists;
};
export const useFetchPublicProfilePlaylist = (profileId: string) => {
  const dispatch = useDispatch();
  return useQuery(['public-profile-playlist', profileId], {
    queryFn: () => handleGetPublicProfilePlaylist(profileId),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(
        updateNotificationAction({type: 'error', message: errorMessage}),
      );
    },
    enabled: profileId ? true : false,
  });
};
// ********************************* //

// =====> getPublicPlaylistAudios <===== //
const handleGetPublicPlaylistAudios = async (
  playlistId: string,
): Promise<PublicProfilePlaylistAudios> => {
  const {data} = await getPublicPlaylistAudiosHandler('0', '10', playlistId);
  return data?.list;
};
export const useFetchPublicPlaylistAudios = (playlistId: string) => {
  const dispatch = useDispatch();
  return useQuery(['public-playlist-audios', playlistId], {
    queryFn: () => handleGetPublicPlaylistAudios(playlistId),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(
        updateNotificationAction({type: 'error', message: errorMessage}),
      );
    },
    enabled: playlistId ? true : false,
  });
};
// ********************************* //
