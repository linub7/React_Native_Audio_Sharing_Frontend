import {FC} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import AppModal from '@ui/app-modal';
import {
  getPlaylistModalState,
  updatePlaylistModalVisibilityAction,
} from 'src/store/playlist-modal';
import {useFetchPublicPlaylistAudios} from 'src/hooks/query';
import ProfileAudioItem from '@ui/audio-item/profile';
import {getPlayerState} from 'src/store/player';
import colors from '@utils/colors';
import AudioListLoadingUI from '@ui/audio-list-loading';
import useAudioController from 'src/hooks/useAudioController';

interface Props {}

const PlaylistAudioModal: FC<Props> = props => {
  const dispatch = useDispatch();
  const {visible, selectedListId} = useSelector(getPlaylistModalState);
  const {onGoingAudio} = useSelector(getPlayerState);
  const {onAudioPress} = useAudioController();

  const {data, isLoading} = useFetchPublicPlaylistAudios(selectedListId || '');

  const handleCloseModal = () => {
    dispatch(updatePlaylistModalVisibilityAction(false));
  };

  if (isLoading)
    return (
      <View style={styles.container}>
        <AudioListLoadingUI />
      </View>
    );
  return (
    <AppModal visible={visible} onRequestClose={handleCloseModal}>
      <Text style={styles.title}>{data?.title}</Text>
      <FlatList
        contentContainerStyle={styles.container}
        data={data?.audios}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ProfileAudioItem
            name={item.owner?.name}
            title={item.title}
            isPlaying={item.id === onGoingAudio?.id}
            uri={item?.poster}
            onPress={() => onAudioPress(item, data?.audios || [])}
          />
        )}
      />
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
  },
});

export default PlaylistAudioModal;
