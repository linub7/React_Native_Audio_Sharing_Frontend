import {FC} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import AudioListModal from '@ui/audio-list-modal';
import {getPlayerState} from 'src/store/player';
import useAudioController from 'src/hooks/useAudioController';

interface Props {
  visible: boolean;
  onRequestClose(): void;
}

const CurrentAudioList: FC<Props> = ({visible, onRequestClose}) => {
  const {onGoingList} = useSelector(getPlayerState);
  const {onAudioPress} = useAudioController();
  return (
    <AudioListModal
      header="Audios on the way!"
      visible={visible}
      onRequestClose={onRequestClose}
      data={onGoingList}
      onItemPress={onAudioPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CurrentAudioList;
