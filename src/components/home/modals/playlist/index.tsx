import {FC} from 'react';
import {ScrollView} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

import BasicModalContainer from '@ui/basic-modal';
import colors from '@utils/colors';
import ListItem from './list-item';
import {Playlist} from 'src/@types/playlist';
import {oldPlaylistValidationSchema} from '@utils/validationSchema';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import catchAsyncError from 'src/api/catchError';
import {updatePlaylistHandler} from 'src/api/playlist';

interface Props {
  visible: boolean;
  onRequestClose(): void;
  playlist: Playlist[];
  onPress?(): void;
  handleUpdatePlaylistAudios(item: Playlist): void;
}

const PlaylistModal: FC<Props> = ({
  visible,
  onRequestClose,
  playlist,
  onPress,
  handleUpdatePlaylistAudios,
}) => {
  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      <ScrollView>
        {playlist?.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            icon={
              <FontAwesomeIcon
                name={item.visibility === 'public' ? 'globe' : 'lock'}
                color={colors.PRIMARY}
                size={20}
              />
            }
            onPress={() => handleUpdatePlaylistAudios(item)}
          />
        ))}
      </ScrollView>
      <ListItem
        title="Create New"
        icon={<AntDesignIcon name="plus" color={colors.PRIMARY} size={20} />}
        onPress={onPress}
      />
    </BasicModalContainer>
  );
};

export default PlaylistModal;
