import AudioItem from '@ui/audio-item';
import LatestUploadsSkeleton from '@ui/skeletons/latest-uploads';
import colors from '@utils/colors';
import {FC} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFetchLatestAudios} from 'src/hooks/query';

interface Props {}

const LatestUploads: FC<Props> = props => {
  const {data, isLoading} = useFetchLatestAudios();

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
            onPress={() => console.log('on audio press')}
            onLongPress={() => console.log('on audio long press')}
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
