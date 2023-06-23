import {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {getSource} from '@utils/helper';
import colors from '@utils/colors';
import PlayAnimation from '@ui/play-animation';

interface Props {
  title: string;
  poster?: string;
  onPress?(): void;
  playing: boolean;
}

const RecentlyPlayedItem: FC<Props> = ({
  title,
  poster,
  onPress,
  playing = false,
}) => {
  const source = getSource(poster);
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View>
        <Image source={source} style={styles.poster} />
        <PlayAnimation visible={playing} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.OVERLAY,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  poster: {
    width: 50,
    height: 50,
  },
  titleContainer: {
    flex: 1,
    padding: 5,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '500',
  },
});

export default RecentlyPlayedItem;
