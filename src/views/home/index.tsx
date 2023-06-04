import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFetchLatestAudios} from 'src/hooks/query';

import AudioList from '@components/audio/list';
import Skeleton from '@ui/skeleton';

interface Props {}

const HomeScreen: FC<Props> = props => {
  const {data, isLoading} = useFetchLatestAudios();

  if (isLoading) return <Skeleton />;

  return (
    <View style={styles.container}>
      <AudioList label="Latest Uploads" data={data ? data : []} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default HomeScreen;
