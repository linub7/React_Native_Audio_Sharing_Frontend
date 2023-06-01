import {FC, useState} from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Pressable,
} from 'react-native';

import CategorySelectorComponent from '@components/shared/category-selector';
import FileSelectorComponent from '@components/shared/file-selector';
import AppButton from '@ui/app-button';
import colors from '@utils/colors';
import {categories} from '@utils/categories';

interface Props {}

const UploadScreen: FC<Props> = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [audioInfo, setAudioInfo] = useState({
    category: '',
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelectorContainer}>
        <FileSelectorComponent
          btnTitle="Select Poster"
          iconName="image-outline"
        />
        <FileSelectorComponent
          btnTitle="Select Audio"
          iconName="file-music-outline"
          style={{marginLeft: 20}}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="Title"
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
        />
        <CategorySelectorComponent
          visible={modalVisible}
          title="Category"
          data={categories}
          renderItem={item => <Text style={styles.category}>{item}</Text>}
          onSelect={item => setAudioInfo({...audioInfo, category: item})}
          onRequestClose={() => setModalVisible(false)}
        />
        <View style={{marginBottom: 20}} />
        <AppButton
          borderRadius={7}
          btnTitle="Submit"
          loading={false}
          onPress={() => {}}
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
