import {FC} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import ProfileAudioItem from '@ui/audio-item/profile';
import EmptyRecords from '@ui/empty-records';
import ProfileTopBarsSkeleton from '@ui/skeletons/profile-top-bars';
import {useFetchFavoritesByProfile} from 'src/hooks/query';

interface Props {}

const FavoritesTab: FC<Props> = props => {
  const {data, isLoading} = useFetchFavoritesByProfile();
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
          onPress={() => console.log('on press')}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FavoritesTab;
