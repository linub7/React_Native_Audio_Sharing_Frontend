import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import PlayerController from '@ui/player-controller';
import colors from '@utils/colors';
import useAudioController from 'src/hooks/useAudioController';
import PlayPauseButton from '@components/shared/play-pause-button';

interface Props {}

const AudioPlayerControllers: FC<Props> = props => {
  const {togglePlayPause, skipTo, onNextPress, onPreviousPress} =
    useAudioController();

  const handleSkipTo = async (skipType: 'forward' | 'reverse') => {
    if (skipType === 'forward') await skipTo(10);
    if (skipType === 'reverse') await skipTo(-10);
  };

  const handleOnNextPress = async () => {
    await onNextPress();
  };
  const handleOnPreviousPress = async () => {
    await onPreviousPress();
  };

  return (
    <View style={styles.container}>
      {/* Previous */}
      <PlayerController ignoreContainer onPress={handleOnPreviousPress}>
        <AntDesign name="stepbackward" color={colors.CONTRAST} size={24} />
      </PlayerController>

      {/* Skip time left */}
      <PlayerController ignoreContainer onPress={() => handleSkipTo('reverse')}>
        <FontAwesome name="rotate-left" color={colors.CONTRAST} size={18} />
        <Text style={styles.skipText}>-10 sec</Text>
      </PlayerController>

      {/* Play pause */}
      <PlayerController onPress={togglePlayPause}>
        <PlayPauseButton color={colors.PRIMARY} />
      </PlayerController>

      {/* Skip time right */}
      <PlayerController ignoreContainer onPress={() => handleSkipTo('forward')}>
        <FontAwesome name="rotate-right" color={colors.CONTRAST} size={18} />
        <Text style={styles.skipText}>+10 sec</Text>
      </PlayerController>

      {/* Next */}
      <PlayerController ignoreContainer onPress={handleOnNextPress}>
        <AntDesign name="stepforward" color={colors.CONTRAST} size={24} />
      </PlayerController>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  skipText: {
    fontSize: 12,
    marginTop: 2,
    color: colors.CONTRAST,
  },
});

export default AudioPlayerControllers;
