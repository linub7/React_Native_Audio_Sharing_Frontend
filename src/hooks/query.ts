import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import {AudioDataResponse} from 'src/@types/audio';
import {getLatestUploadsHandler} from 'src/api/audio';
import catchAsyncError from 'src/api/catchError';
import {updateNotificationAction} from 'src/store/notification';

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
