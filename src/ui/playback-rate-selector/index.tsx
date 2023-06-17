import {FC, useState} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import colors from '@utils/colors';
import {SELECTOR_SIZE, speedRates} from '@utils/constants';
import Selector from './selector';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  activeRate?: string;
  onPress?(rate: number): void;
}

const PlaybackRateSelector: FC<Props> = ({
  containerStyle,
  activeRate,
  onPress,
}) => {
  const [showBtn, setShowBtn] = useState(true);

  const width = useSharedValue(0);

  const handleOnPress = () => {
    setShowBtn(false);
    width.value = withTiming(SELECTOR_SIZE * speedRates.length, {
      duration: 7,
    });
  };

  const widthStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      {showBtn && (
        <Pressable onPress={handleOnPress}>
          <FontAwesome5 name="running" color={colors.CONTRAST} size={24} />
        </Pressable>
      )}
      <Animated.View style={[styles.buttons, widthStyle]}>
        {speedRates?.map((item, index) => (
          <Selector
            value={item}
            key={index}
            onPress={() => onPress && onPress(+item)}
            active={activeRate === item}
          />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  buttons: {
    flexDirection: 'row',
    backgroundColor: colors.OVERLAY,
    overflow: 'hidden',
    alignSelf: 'center',
  },
});

export default PlaybackRateSelector;
