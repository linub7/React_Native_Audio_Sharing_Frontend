import {FC} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';

import EmptyRecords from '@ui/empty-records';
import PlaylistItem from '@ui/playlist-item';
import ProfileTopBarsSkeleton from '@ui/skeletons/profile-top-bars';
import {useFetchPublicProfilePlaylist} from 'src/hooks/query';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PublicProfileTabParamList} from 'src/@types/navigation';
import {Playlist} from 'src/@types/playlist';
import {
  updatePlaylistModalSelectedListIdAction,
  updatePlaylistModalVisibilityAction,
} from 'src/store/playlist-modal';

type Props = NativeStackScreenProps<
  PublicProfileTabParamList,
  'public-playlist'
>;

const PublicProfilePlaylistTab: FC<Props> = props => {
  const {data, isLoading} = useFetchPublicProfilePlaylist(
    props.route.params.profileId,
  );

  const dispatch = useDispatch();

  const handlePressPlaylist = (item: Playlist) => {
    dispatch(updatePlaylistModalVisibilityAction(true));
    dispatch(updatePlaylistModalSelectedListIdAction(item?.id));
  };

  if (isLoading) return <ProfileTopBarsSkeleton />;

  if (!data?.length)
    return <EmptyRecords title="There is no Public Playlist Yet!" />;
  return (
    <ScrollView>
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

export default PublicProfilePlaylistTab;
