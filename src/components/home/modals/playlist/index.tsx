import BasicModalContainer from '@ui/basic-modal';
import colors from '@utils/colors';
import {FC} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import ListItem from './list-item';
import {Playlist} from 'src/@types/playlist';

interface Props {
  visible: boolean;
  onRequestClose(): void;
  playlist: Playlist[];
  onPress?(): void;
}

const PlaylistModal: FC<Props> = ({
  visible,
  onRequestClose,
  playlist,
  onPress,
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

const styles = StyleSheet.create({
  container: {},
});

export default PlaylistModal;
