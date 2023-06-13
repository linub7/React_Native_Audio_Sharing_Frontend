import {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import AnimatedStroke from '@ui/animated-stroke';

interface Props {
  visible: boolean;
}

const PlayAnimation: FC<Props> = ({visible}) => {
  if (!visible) return null;
  return (
    <View style={styles.indicatorBox}>
      <View style={styles.strokeContainer}>
        <AnimatedStroke
          lowestScale={0}
          durationSequence={800}
          durationTime={800}
        />
        <AnimatedStroke
          lowestScale={0.2}
          durationSequence={800}
          durationTime={800}
        />
        <AnimatedStroke
          lowestScale={0.4}
          durationSequence={800}
          durationTime={800}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorBox: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  strokeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default PlayAnimation;
