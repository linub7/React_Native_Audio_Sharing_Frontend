import colors from '@utils/colors';
import {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

interface Props {
  onPress?(): void;
  onLongPress?(): void;
  uri?: string;
  title: string;
}

const AudioItem: FC<Props> = ({onPress, onLongPress, uri, title}) => {
  const source = uri ? {uri} : require('../../assets/music.png');
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={{width: 100, marginRight: 15}}>
      <Image source={source} style={styles.image} />
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
