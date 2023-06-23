import {FC} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import ProfileAudioItem from '@ui/audio-item/profile';
import {useFetchUploadsByProfile} from 'src/hooks/query';
import ProfileTopBarsSkeleton from '@ui/skeletons/profile-top-bars';
import EmptyRecords from '@ui/empty-records';
import useAudioController from 'src/hooks/useAudioController';
import {getPlayerState} from 'src/store/player';

interface Props {}

const UploadsTab: FC<Props> = props => {
  const {data, isLoading} = useFetchUploadsByProfile();
  const {onAudioPress} = useAudioController();
  const {onGoingAudio} = useSelector(getPlayerState);

  if (isLoading) return <ProfileTopBarsSkeleton />;

  if (!data?.length) return <EmptyRecords title="There is no Audio!" />;

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

export default UploadsTab;
