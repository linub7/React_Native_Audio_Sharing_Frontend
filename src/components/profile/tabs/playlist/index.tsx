import {FC} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import PlaylistItem from '@ui/playlist-item';
import {useFetchMyPlaylists} from 'src/hooks/query';
import ProfileTopBarsSkeleton from '@ui/skeletons/profile-top-bars';
import EmptyRecords from '@ui/empty-records';

interface Props {}

const PlaylistTab: FC<Props> = props => {
  const {data, isLoading} = useFetchMyPlaylists();

  if (isLoading) return <ProfileTopBarsSkeleton />;

  if (!data?.length) return <EmptyRecords title="There is no Playlist Yet!" />;
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
