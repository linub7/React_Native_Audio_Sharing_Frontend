import {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import GridView from '@ui/grid-view';
import colors from '@utils/colors';
import {useFetchRecommendedAudios} from 'src/hooks/query';
import RecommendedAudiosSkeleton from '@ui/skeletons/recommended-audios';
import {AudioDataResponse} from 'src/@types/audio';

interface Props {
  onPress(item: AudioDataResponse, data: AudioDataResponse[]): void;
  onLongPress(item: AudioDataResponse, data: AudioDataResponse[]): void;
}

const RecommendedAudios: FC<Props> = ({onPress, onLongPress}) => {
  const {data = [], isLoading} = useFetchRecommendedAudios();

  const getPoster = (poster?: string) =>
    poster ? {uri: poster} : require('../../../assets/music.png');

  if (isLoading) return <RecommendedAudiosSkeleton />;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recommended Audios</Text>
      <GridView
        col={3}
        data={data || []}
        renderItem={item => (
          <Pressable
            onPress={() => onPress(item, data)}
            onLongPress={() => onLongPress(item, data)}>
            <Image source={getPoster(item?.poster)} style={styles.image} />
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
  image: {width: '100%', aspectRatio: 1, borderRadius: 7},
});

export default RecommendedAudios;
