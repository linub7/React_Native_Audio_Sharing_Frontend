import {FC} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import PlaylistItem from '@ui/playlist-item';
import {useFetchMyPlaylists} from 'src/hooks/query';

interface Props {}

const PlaylistTab: FC<Props> = props => {
  const {data, isLoading} = useFetchMyPlaylists();
  return (
    <ScrollView style={styles.container}>
      {data?.map((item, index) => (
        <PlaylistItem playlist={item} key={index} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlaylistTab;
