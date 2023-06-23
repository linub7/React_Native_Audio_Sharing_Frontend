import {FC} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import ProfileAudioItem from '@ui/audio-item/profile';
import EmptyRecords from '@ui/empty-records';
import ProfileTopBarsSkeleton from '@ui/skeletons/profile-top-bars';
import {useFetchFavoritesByProfile} from 'src/hooks/query';
import useAudioController from 'src/hooks/useAudioController';
import {getPlayerState} from 'src/store/player';

interface Props {}

const FavoritesTab: FC<Props> = props => {
  const {data, isLoading} = useFetchFavoritesByProfile();
  const {onAudioPress} = useAudioController();
  const {onGoingAudio} = useSelector(getPlayerState);

  if (isLoading) return <ProfileTopBarsSkeleton />;

  if (!data?.length) return <EmptyRecords title="There is no Favorites!" />;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
