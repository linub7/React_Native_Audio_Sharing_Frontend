import {FC} from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useQueryClient} from 'react-query';

import ProfileAudioItem from '@ui/audio-item/profile';
import EmptyRecords from '@ui/empty-records';
import ProfileTopBarsSkeleton from '@ui/skeletons/profile-top-bars';
import {useFetchFavoritesByProfile} from 'src/hooks/query';
import useAudioController from 'src/hooks/useAudioController';
import {getPlayerState} from 'src/store/player';
import colors from '@utils/colors';

interface Props {}

const FavoritesTab: FC<Props> = props => {
  const {data, isLoading, isFetching} = useFetchFavoritesByProfile();
  const {onAudioPress} = useAudioController();
  const {onGoingAudio} = useSelector(getPlayerState);

  const queryClient = useQueryClient();

  const noData = !data?.length;

  const handleOnRefreshScreen = () =>
    queryClient.invalidateQueries({queryKey: ['my-favorites']});

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
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      {noData && <EmptyRecords title="There is no Favorites!" />}
      {data?.map((item, index) => (
        <ProfileAudioItem
          name={item.owner.name}
          title={item.title}
          key={index}
          uri={item?.poster}
          onPress={() => onAudioPress(item, data)}
          isPlaying={onGoingAudio?.id === item.id}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FavoritesTab;
