import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import colors from '@utils/colors';
import {formattedDuration} from '@utils/helper';

interface Props {
  position: number;
  duration: number;
}

const AudioPlayerDuration: FC<Props> = ({position, duration}) => {
  return (
    <View style={styles.durationContainer}>
      {/* position & duration are in seconds -> formattedDuration must be in milliseconds -> * 1000 */}
      <Text style={styles.duration}>{formattedDuration(position * 1000)}</Text>
      <Text style={styles.duration}>{formattedDuration(duration * 1000)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  duration: {
    color: colors.CONTRAST,
  },
});

export default AudioPlayerDuration;
