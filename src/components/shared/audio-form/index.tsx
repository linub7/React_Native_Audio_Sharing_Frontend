import {FC, useEffect, useState} from 'react';
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
import {
  newAudioInfoValidationSchema,
  oldAudioInfoValidationSchema,
} from '@utils/validationSchema';
import Progress from '@ui/progress';
import catchAsyncError from 'src/api/catchError';
import AppView from '@components/app-view';

interface FormFields {
  title: string;
  category: string;
  about: string;
  file?: DocumentPickerResponse;
  poster?: DocumentPickerResponse;
}

interface Props {
  initialValues?: {
    title: string;
    about: string;
    category: string;
  };
  onSubmit(formData: FormData): void;
  uploadProgress?: number;
  loading?: boolean;
}

const defaultForm: FormFields = {
  title: '',
  about: '',
  category: '',
  file: undefined,
  poster: undefined,
};

const AudioForm: FC<Props> = ({
  initialValues,
  uploadProgress = 0,
  loading,
  onSubmit,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [audioInfo, setAudioInfo] = useState({...defaultForm});
  const [isForUpdate, setIsForUpdate] = useState(false);

  const handleSubmit = async () => {
    try {
      let validationRes;
      const formData = new FormData();
      if (isForUpdate) {
        validationRes = await oldAudioInfoValidationSchema.validate(audioInfo);
      } else {
        validationRes = await newAudioInfoValidationSchema.validate(audioInfo);
        formData.append('file', {
          name: validationRes.file.name,
          type: validationRes.file.type,
          uri: validationRes.file.uri,
        });
      }

      formData.append('title', validationRes.title);
      formData.append('about', validationRes.about);
      formData.append('category', validationRes.category);
      if (validationRes.poster.uri) {
        formData.append('poster', {
          name: validationRes.poster.name,
          type: validationRes.poster.type,
          uri: validationRes.poster.uri,
        });
      }

      onSubmit(formData);
    } catch (error: any) {
      if (error instanceof Yup.ValidationError)
        Toast.show({type: 'error', text1: error.errors[0]});
      else {
        const errorMessage = catchAsyncError(error);
        Toast.show({type: 'error', text1: errorMessage});
      }
    }
  };

  useEffect(() => {
    if (initialValues) {
      setAudioInfo({
        ...initialValues,
      });
      setIsForUpdate(true);
    }
  }, [initialValues]);

  return (
    <AppView>
      <ScrollView style={styles.container}>
        <View style={styles.fileSelectorContainer}>
          <FileSelectorComponent
            btnTitle="Select Poster"
            iconName="image-outline"
            options={{type: [types.images]}}
            onSelect={poster => setAudioInfo({...audioInfo, poster})}
          />
          {!isForUpdate && (
            <FileSelectorComponent
              btnTitle="Select Audio"
              iconName="file-music-outline"
              style={{marginLeft: 20}}
              options={{type: [types.audio]}}
              onSelect={file => setAudioInfo({...audioInfo, file})}
            />
          )}
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
            btnTitle={isForUpdate ? 'Update' : 'Submit'}
            loading={loading}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </AppView>
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

export default AudioForm;
