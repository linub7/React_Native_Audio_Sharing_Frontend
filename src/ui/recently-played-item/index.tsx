import {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {getSource} from '@utils/helper';
import colors from '@utils/colors';

interface Props {
  title: string;
  poster?: string;
  onPress?(): void;
}

const RecentlyPlayedItem: FC<Props> = ({title, poster, onPress}) => {
  const source = getSource(poster);
  return (
    <Pressable style={styles.container}>
      <Image source={source} style={styles.poster} />
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
