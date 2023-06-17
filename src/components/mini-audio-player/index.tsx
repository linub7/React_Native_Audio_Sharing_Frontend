import {FC, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useProgress} from 'react-native-track-player';

import colors from '@utils/colors';
import {MINI_PLAYER_HEIGHT} from '@utils/constants';
import {getPlayerState} from 'src/store/player';
import {getSource} from '@utils/helper';
import AudioPlayerIcon from '@ui/audio-player-icon';
import {mapRange} from '@utils/math';
import AudioPlayer from '@components/home/audio-player';
import PlayPauseButton from '@components/shared/play-pause-button';

interface Props {}

const MiniAudioPlayer: FC<Props> = ({}) => {
  const [playerVisibility, setPlayerVisibility] = useState(false);

  const {onGoingAudio} = useSelector(getPlayerState);
  const source = getSource(onGoingAudio?.poster);
  const progress = useProgress();

  const closePlayerModal = () => setPlayerVisibility(false);
  const showPlayerModal = () => setPlayerVisibility(true);

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
        <Pressable onPress={showPlayerModal} style={styles.contentContainer}>
          <Text style={styles.title}>{onGoingAudio?.title}</Text>
          <Text style={styles.name}>{onGoingAudio?.owner.name}</Text>
        </Pressable>
        <AudioPlayerIcon
          name="hearto"
          size={24}
          color={colors.CONTRAST}
          containerStyle={styles.heartIcon}
        />
        <PlayPauseButton color={colors.CONTRAST} />
      </View>

      <AudioPlayer
        onRequestClose={closePlayerModal}
        visible={playerVisibility}
      />
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
