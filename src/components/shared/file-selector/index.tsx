import {FC} from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import DocumentPicker, {
  DocumentPickerOptions,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {SupportedPlatforms} from 'react-native-document-picker/lib/typescript/fileTypes';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '@utils/colors';

interface Props {
  iconName: string;
  btnTitle: string;
  onSelect(file: DocumentPickerResponse): void;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  options?: DocumentPickerOptions<SupportedPlatforms>;
}

const FileSelectorComponent: FC<Props> = ({
  iconName,
  btnTitle,
  onSelect,
  color = colors.SECONDARY,
  size = 35,
  style,
  options,
}) => {
  const handleDocumentSelect = async () => {
    try {
      const document = await DocumentPicker.pick(options);
      const file = document[0];
      /**
       * document is :[
       *  {
       *    "fileCopyUri": null,
       *    "name": "",
       *    "size": ,
       *    "type": "",
       *    "uri": ""
       *  }
       * ]
       */
      onSelect && onSelect(file);
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log(error);
      }
    }
  };
  return (
    <Pressable
      style={[styles.btnContainer, style]}
      onPress={handleDocumentSelect}>
      <View style={styles.iconContainer}>
        <MaterialComIcon name={iconName} size={size} color={color} />
      </View>
      <Text style={styles.btnTitle}>{btnTitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 70,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    color: colors.CONTRAST,
    marginTop: 5,
  },
});

export default FileSelectorComponent;
