import {FC} from 'react';
import {ScrollView, StyleSheet, RefreshControl} from 'react-native';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';

import PlaylistItem from '@ui/playlist-item';
import {useFetchMyPlaylists} from 'src/hooks/query';
import ProfileTopBarsSkeleton from '@ui/skeletons/profile-top-bars';
import EmptyRecords from '@ui/empty-records';
import colors from '@utils/colors';
import {Playlist} from 'src/@types/playlist';
import {
  updatePlaylistModalSelectedListIdAction,
  updatePlaylistModalVisibilityAction,
} from 'src/store/playlist-modal';

interface Props {}

const PlaylistTab: FC<Props> = props => {
  const {data, isLoading, isFetching} = useFetchMyPlaylists();

  const queryClient = useQueryClient();

  const noData = !data?.length;

  const dispatch = useDispatch();

  const handlePressPlaylist = (item: Playlist) => {
    dispatch(updatePlaylistModalVisibilityAction(true));
    dispatch(updatePlaylistModalSelectedListIdAction(item?.id));
  };

  const handleOnRefreshScreen = () =>
    queryClient.invalidateQueries({queryKey: ['my-playlists']});

  if (isLoading) return <ProfileTopBarsSkeleton />;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={handleOnRefreshScreen}
          tintColor={colors.CONTRAST}
        />
      }
      style={styles.container}>
      {noData && <EmptyRecords title="There is no Playlist!" />}
      {data?.map((item, index) => (
        <PlaylistItem
          playlist={item}
          key={index}
          onPress={() => handlePressPlaylist(item)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlaylistTab;
