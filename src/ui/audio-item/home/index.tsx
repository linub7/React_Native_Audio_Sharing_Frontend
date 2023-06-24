import {FC} from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import PlayAnimation from '@ui/play-animation';
import colors from '@utils/colors';
import {getSource} from '@utils/helper';

interface Props {
  onPress?(): void;
  onLongPress?(): void;
  uri?: string;
  title: string;
  playing?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const AudioItem: FC<Props> = ({
  onPress,
  onLongPress,
  uri,
  title,
  playing = false,
  containerStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.container, containerStyle]}>
      <View style={styles.imageContainer}>
        <Image source={getSource(uri)} style={styles.image} />
        <PlayAnimation visible={playing} />
      </View>
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {width: 100, marginRight: 15},
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 7,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
});

export default AudioItem;
