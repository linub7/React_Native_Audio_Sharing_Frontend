import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import AppModal from '@ui/app-modal';
import {
  getPlaylistModalState,
  updatePlaylistModalVisibilityAction,
} from 'src/store/playlist-modal';

interface Props {}

const PlaylistAudioModal: FC<Props> = props => {
  const dispatch = useDispatch();
  const {visible} = useSelector(getPlaylistModalState);

  const handleCloseModal = () => {
    dispatch(updatePlaylistModalVisibilityAction(false));
  };
  return (
    <AppModal visible={visible} onRequestClose={handleCloseModal}>
      <View />
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlaylistAudioModal;
