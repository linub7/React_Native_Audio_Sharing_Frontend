import {FC, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {useQueryClient} from 'react-query';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import {ProfileNavigatorStackParamList} from 'src/@types/navigation';
import AudioForm from '@components/shared/audio-form';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import client from 'src/api/client';
import {mapRange} from '@utils/math';
import catchAsyncError from 'src/api/catchError';

type Props = NativeStackScreenProps<
  ProfileNavigatorStackParamList,
  'edit-audio'
>;

const UpdateAudioScreen: FC<Props> = ({route: {params}}) => {
  const {audio} = params;

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const queryClient = useQueryClient();

  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  const handleUpdateAudio = async (formData: FormData) => {
    setLoading(true);
    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      if (!token) return;

      const {data} = await client.patch(`/audios/${audio.id}`, formData, {
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
      queryClient.invalidateQueries({queryKey: ['my-uploads']});
      Toast.show({type: 'success', text1: 'Audio Updated successfully!'});
      navigate('profile');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Toast.show({type: 'error', text1: error.errors[0]});
      } else {
        const errorMessage = catchAsyncError(error);

        Toast.show({type: 'error', text1: errorMessage});
      }
    }

    setLoading(false);
  };
  return (
    <AudioForm
      initialValues={{
        title: audio.title,
        about: audio.about,
        category: audio.category,
      }}
      loading={loading}
      uploadProgress={uploadProgress}
      onSubmit={handleUpdateAudio}
    />
  );
};

export default UpdateAudioScreen;
