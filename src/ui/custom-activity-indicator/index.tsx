import {FC, useEffect, useRef} from 'react';
import {StyleSheet, Animated, View, Easing} from 'react-native';

interface Props {}

const CustomActivityIndicator: FC<Props> = props => {
  const lowestScale = 0.4;
  const scaleAnim = useRef(new Animated.Value(lowestScale)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: lowestScale,
          duration: 800,
          easing: Easing.back(1),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleAnim]);

  return (
    <View style={styles.indicatorBox}>
      <Animated.View
        style={{
          ...styles.indicator,
          scaleX: scaleAnim,
          scaleY: scaleAnim,
        }}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorBox: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
    width: 70,
    height: 70,
    borderRadius: 100,
  },
});

export default CustomActivityIndicator;
