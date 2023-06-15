import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import GridView from '@ui/grid-view';
import colors from '@utils/colors';
import {useFetchRecommendedAudios} from 'src/hooks/query';
import RecommendedAudiosSkeleton from '@ui/skeletons/recommended-audios';
import {AudioDataResponse} from 'src/@types/audio';
import AudioItem from '@ui/audio-item/home';
import {getPlayerState} from 'src/store/player';

interface Props {
  onPress(item: AudioDataResponse, data: AudioDataResponse[]): void;
  onLongPress(item: AudioDataResponse, data: AudioDataResponse[]): void;
}

const RecommendedAudios: FC<Props> = ({onPress, onLongPress}) => {
  const {data = [], isLoading} = useFetchRecommendedAudios();
  const {onGoingAudio} = useSelector(getPlayerState);

  if (isLoading) return <RecommendedAudiosSkeleton />;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>You May Like this</Text>
      <GridView
        col={3}
        data={data || []}
        renderItem={item => (
          <AudioItem
            title={item.title}
            uri={item.poster}
            onPress={() => onPress(item, data)}
            onLongPress={() => onLongPress(item, data)}
            playing={item.id === onGoingAudio?.id}
            containerStyle={{width: '100%'}}
          />
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
