import {FC} from 'react';
import {StyleSheet} from 'react-native';

import AudioPlayerIcon from '@ui/audio-player-icon';
import CustomActivityIndicator from '@ui/custom-activity-indicator';
import useAudioController from 'src/hooks/useAudioController';

interface Props {
  color: string;
}

const PlayPauseButton: FC<Props> = ({color}) => {
  const {isPlaying, togglePlayPause, isBusy} = useAudioController();

  return isBusy ? (
    <CustomActivityIndicator />
  ) : (
    <AudioPlayerIcon
      name={isPlaying ? 'pause' : 'caretright'}
      size={24}
      color={color}
      onPress={togglePlayPause}
      containerStyle={styles.button}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlayPauseButton;
