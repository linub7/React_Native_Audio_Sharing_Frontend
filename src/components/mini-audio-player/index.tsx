import {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import colors from '@utils/colors';
import {MINI_PLAYER_HEIGHT} from '@utils/constants';
import {getPlayerState} from 'src/store/player';
import {getSource} from '@utils/helper';
import AudioPlayerIcon from '@ui/audio-player-icon';
import CustomActivityIndicator from '@ui/custom-activity-indicator';
import useAudioController from 'src/hooks/useAudioController';
import {mapRange} from '@utils/math';
import {useProgress} from 'react-native-track-player';

interface Props {}

const MiniAudioPlayer: FC<Props> = ({}) => {
  const {onGoingAudio} = useSelector(getPlayerState);
  const {isPlaying, togglePlayPause, isBusy} = useAudioController();
  const source = getSource(onGoingAudio?.poster);
  const progress = useProgress();

  return (
    <>
      <View
        style={{
          height: 3,
          backgroundColor: colors.SECONDARY,
          width: `${mapRange({
            outputMin: 0,
            outputMax: 100,
            inputMin: 0,
            inputMax: progress.duration,
            inputValue: progress.position,
          })}%`,
        }}
      />
      <View style={styles.container}>
        <Image source={source} style={styles.poster} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{onGoingAudio?.title}</Text>
          <Text style={styles.name}>{onGoingAudio?.owner.name}</Text>
        </View>
        <AudioPlayerIcon
          name="hearto"
          size={24}
          color={colors.CONTRAST}
          containerStyle={styles.heartIcon}
        />
        {isBusy ? (
          <CustomActivityIndicator />
        ) : (
          <AudioPlayerIcon
            name={isPlaying ? 'pause' : 'caretright'}
            size={24}
            color={colors.CONTRAST}
            onPress={togglePlayPause}
            containerStyle={styles.button}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: MINI_PLAYER_HEIGHT,
    backgroundColor: colors.PRIMARY,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    padding: 5,
  },
  poster: {
    height: MINI_PLAYER_HEIGHT - 10,
    width: MINI_PLAYER_HEIGHT - 10,
    borderRadius: 5,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '700',
    paddingHorizontal: 5,
  },
  name: {
    color: colors.SECONDARY,
    fontWeight: '700',
    paddingHorizontal: 5,
  },
  heartIcon: {
    paddingHorizontal: 10,
  },
  button: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MiniAudioPlayer;
