import {FC} from 'react';
import {ScrollView} from 'react-native';

import EmptyRecords from '@ui/empty-records';
import PlaylistItem from '@ui/playlist-item';
import ProfileTopBarsSkeleton from '@ui/skeletons/profile-top-bars';
import {useFetchPublicProfilePlaylist} from 'src/hooks/query';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PublicProfileTabParamList} from 'src/@types/navigation';

type Props = NativeStackScreenProps<
  PublicProfileTabParamList,
  'public-playlist'
>;

const PublicProfilePlaylistTab: FC<Props> = props => {
  const {data, isLoading} = useFetchPublicProfilePlaylist(
    props.route.params.profileId,
  );

  if (isLoading) return <ProfileTopBarsSkeleton />;

  if (!data?.length)
    return <EmptyRecords title="There is no Public Playlist Yet!" />;
  return (
    <ScrollView>
      {data?.map((item, index) => (
        <PlaylistItem playlist={item} key={index} />
      ))}
    </ScrollView>
  );
};

export default PublicProfilePlaylistTab;
