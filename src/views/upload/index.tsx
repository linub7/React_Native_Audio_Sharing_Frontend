import {FC, useState} from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import {DocumentPickerResponse, types} from 'react-native-document-picker';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

import CategorySelectorComponent from '@components/shared/category-selector';
import FileSelectorComponent from '@components/shared/file-selector';
import AppButton from '@ui/app-button';
import colors from '@utils/colors';
import {categories} from '@utils/categories';
import {audioInfoValidationSchema} from '@utils/validationSchema';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import Progress from '@ui/progress';
import client from 'src/api/client';
import {mapRange} from '@utils/math';
import catchAsyncError from 'src/api/catchError';

interface FormFields {
  title: string;
  category: string;
  about: string;
  file?: DocumentPickerResponse;
  poster?: DocumentPickerResponse;
}

interface Props {}

const defaultForm: FormFields = {
  title: '',
  about: '',
  category: '',
  file: undefined,
  poster: undefined,
};

const UploadScreen: FC<Props> = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [audioInfo, setAudioInfo] = useState({...defaultForm});
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadAudio = async () => {
    setLoading(true);
    try {
      const validationRes = await audioInfoValidationSchema.validate(audioInfo);

      const formData = new FormData();
      formData.append('title', validationRes.title);
      formData.append('about', validationRes.about);
      formData.append('category', validationRes.category);
      formData.append('file', {
        name: validationRes.file.name,
        type: validationRes.file.type,
        uri: validationRes.file.uri,
      });
      if (validationRes.poster.uri) {
        formData.append('poster', {
          name: validationRes.poster.name,
          type: validationRes.poster.type,
          uri: validationRes.poster.uri,
        });
      }

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
            setAudioInfo({...defaultForm});
            setLoading(false);
          }

          setUploadProgress(Math.floor(uploaded));
        },
      });
    } catch (error: any) {
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
    <ScrollView style={styles.container}>
      <View style={styles.fileSelectorContainer}>
        <FileSelectorComponent
          btnTitle="Select Poster"
          iconName="image-outline"
          options={{type: [types.images]}}
          onSelect={poster => setAudioInfo({...audioInfo, poster})}
        />
        <FileSelectorComponent
          btnTitle="Select Audio"
          iconName="file-music-outline"
          style={{marginLeft: 20}}
          options={{type: [types.audio]}}
          onSelect={file => setAudioInfo({...audioInfo, file})}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="Title"
          onChangeText={text => setAudioInfo({...audioInfo, title: text})}
          value={audioInfo.title}
        />
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.categorySelector}>
          <Text style={styles.categorySelectorTitle}>Category</Text>
          <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
        </Pressable>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="About"
          numberOfLines={10}
          multiline
          onChangeText={text => setAudioInfo({...audioInfo, about: text})}
          value={audioInfo.about}
        />
        <CategorySelectorComponent
          visible={modalVisible}
          title="Category"
          data={categories}
          renderItem={item => <Text style={styles.category}>{item}</Text>}
          onSelect={item => setAudioInfo({...audioInfo, category: item})}
          onRequestClose={() => setModalVisible(false)}
        />
        <View style={{marginVertical: 20}}>
          {loading && <Progress progress={uploadProgress} />}
        </View>
        <AppButton
          borderRadius={7}
          btnTitle="Submit"
          loading={loading}
          onPress={handleUploadAudio}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  fileSelectorContainer: {
    flexDirection: 'row',
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONTRAST,
    textAlignVertical: 'top',
  },
  category: {
    padding: 10,
    color: colors.PRIMARY,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  categorySelectorTitle: {
    color: colors.CONTRAST,
  },
  selectedCategory: {
    color: colors.SECONDARY,
    marginLeft: 5,
    fontStyle: 'italic',
  },
});

export default UploadScreen;
