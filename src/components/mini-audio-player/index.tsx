import {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import colors from '@utils/colors';
import {MINI_PLAYER_HEIGHT} from '@utils/constants';
import {getPlayerState} from 'src/store/player';
import {getSource} from '@utils/helper';
import AudioPlayerIcon from '@ui/audio-player-icon';

interface Props {
  playing?: boolean;
  togglePlayPause?(): void;
}

const MiniAudioPlayer: FC<Props> = ({playing, togglePlayPause}) => {
  const {onGoingAudio} = useSelector(getPlayerState);
  const source = getSource(onGoingAudio?.poster);
  return (
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
      <AudioPlayerIcon
        name={playing ? 'pause' : 'caretright'}
        size={24}
        color={colors.CONTRAST}
        onPress={togglePlayPause}
        containerStyle={styles.button}
      />
    </View>
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
