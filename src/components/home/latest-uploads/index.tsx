import {FC} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import AudioItem from '@ui/audio-item/home';
import LatestUploadsSkeleton from '@ui/skeletons/latest-uploads';
import colors from '@utils/colors';
import {AudioDataResponse} from 'src/@types/audio';
import {useFetchLatestAudios} from 'src/hooks/query';
import {getPlayerState} from 'src/store/player';

interface Props {
  onAudioPress(item: AudioDataResponse, data: AudioDataResponse[]): void;
  onAudioLongPress(item: AudioDataResponse, data: AudioDataResponse[]): void;
}

const LatestUploads: FC<Props> = ({onAudioPress, onAudioLongPress}) => {
  const {data, isLoading} = useFetchLatestAudios();
  const {onGoingAudio} = useSelector(getPlayerState);

  if (isLoading) return <LatestUploadsSkeleton />;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Latest Uploads</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map((item, index) => (
          <AudioItem
            key={item.id}
            title={item.title}
            uri={item.poster}
            onPress={() => onAudioPress(item, data)}
            onLongPress={() => onAudioLongPress(item, data)}
            playing={item.id === onGoingAudio?.id}
          />
        ))}
      </ScrollView>
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
});

export default LatestUploads;
