import {FC, useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';

import colors from '@utils/colors';

interface Props {
  lowestScale: number;
  durationSequence: number;
  durationTime: number;
}

const AnimatedStroke: FC<Props> = ({
  lowestScale,
  durationSequence,
  durationTime,
}) => {
  const scaleAnim = useRef(new Animated.Value(lowestScale)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: durationSequence,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: lowestScale,
          duration: durationTime,
          easing: Easing.back(1),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleAnim]);
  return (
    <Animated.View
      style={{
        ...styles.indicator,
        scaleX: scaleAnim,
        scaleY: scaleAnim,
      }}></Animated.View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: colors.CONTRAST,
    width: 6,
    height: 20,
    marginRight: 5,
  },
});

export default AnimatedStroke;
