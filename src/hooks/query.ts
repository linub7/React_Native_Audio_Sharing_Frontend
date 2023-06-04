import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import {AudioDataResponse} from 'src/@types/audio';
import {getLatestUploadsHandler} from 'src/api/audio';
import catchAsyncError from 'src/api/catchError';
import {getRecommendedAudiosByProfileHandler} from 'src/api/profile';
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
// =====> getLatestUploads <===== //

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
// =====> getRecommendedAudios <===== //
