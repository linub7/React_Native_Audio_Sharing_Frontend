import {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import PlayAnimation from '@ui/play-animation';
import colors from '@utils/colors';
import {getSource} from '@utils/helper';

interface Props {
  onPress?(): void;
  onLongPress?(): void;
  uri?: string;
  title: string;
  playing?: boolean;
}

const AudioItem: FC<Props> = ({
  onPress,
  onLongPress,
  uri,
  title,
  playing = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={{width: 100, marginRight: 15}}>
      <View>
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
  image: {
    height: 100,
    aspectRatio: 1,
    borderRadius: 7,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
});

export default AudioItem;
