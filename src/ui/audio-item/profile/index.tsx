import {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import PlayAnimation from '@ui/play-animation';
import colors from '@utils/colors';

interface Props {
  onPress?(): void;
  uri?: string;
  title: string;
  name: string;
  isPlaying?: boolean;
}

const ProfileAudioItem: FC<Props> = ({
  onPress,
  uri,
  title,
  name,
  isPlaying = false,
}) => {
  const getPoster = (uri?: string) =>
    uri ? {uri} : require('../../../assets/music_small.png');
  return (
    <Pressable style={styles.listItem} onPress={onPress}>
      <View>
        <Image source={getPoster(uri)} style={styles.poster} />
        <PlayAnimation visible={isPlaying} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.owner} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    padding: 5,
  },
  poster: {width: 50, height: 50},
  title: {
    color: colors.CONTRAST,
    fontWeight: '700',
  },
  owner: {
    color: colors.SECONDARY,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: colors.OVERLAY,
    marginBottom: 15,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default ProfileAudioItem;
