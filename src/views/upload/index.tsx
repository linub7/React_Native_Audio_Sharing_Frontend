import {FC, useState} from 'react';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import client from 'src/api/client';
import {mapRange} from '@utils/math';
import AudioForm from '@components/shared/audio-form';
import catchAsyncError from 'src/api/catchError';

interface Props {}

const UploadScreen: FC<Props> = props => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadAudio = async (formData: FormData) => {
    setLoading(true);
    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      if (!token) return;

      const {data} = await client.post(`/audios`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data;',
        },
        onUploadProgress(progressEvent) {
          const uploaded = mapRange({
            inputMin: 0,
            inputMax: progressEvent.total || 0,
            outputMin: 0,
            outputMax: 100,
            inputValue: progressEvent.loaded,
          });

          if (uploaded >= 100) {
            setLoading(false);
          }

          setUploadProgress(Math.floor(uploaded));
        },
      });
      Toast.show({type: 'success', text1: 'Audio Uploaded successfully!'});
    } catch (error) {
      if (error instanceof Yup.ValidationError)
        Toast.show({type: 'error', text1: error.errors[0]});
      else {
        const errorMessage = catchAsyncError(error);
        Toast.show({type: 'error', text1: errorMessage});
      }
    }

    setLoading(false);
  };

  return (
    <AudioForm
      onSubmit={handleUploadAudio}
      loading={loading}
      uploadProgress={uploadProgress}
    />
  );
};

export default UploadScreen;
