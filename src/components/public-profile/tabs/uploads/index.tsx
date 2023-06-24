import {FC} from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useFetchPublicProfileUploads} from 'src/hooks/query';
import ProfileAudioItem from '@ui/audio-item/profile';
import useAudioController from 'src/hooks/useAudioController';
import {getPlayerState} from 'src/store/player';
import ProfileTopBarsSkeleton from '@ui/skeletons/profile-top-bars';
import EmptyRecords from '@ui/empty-records';
import {PublicProfileTabParamList} from 'src/@types/navigation';

type Props = NativeStackScreenProps<
  PublicProfileTabParamList,
  'public-uploads'
>;

const PublicProfileUploadsTab: FC<Props> = props => {
  const {data, isLoading} = useFetchPublicProfileUploads(
    props.route.params.profileId,
  );

  const {onAudioPress} = useAudioController();
  const {onGoingAudio} = useSelector(getPlayerState);

  if (isLoading) return <ProfileTopBarsSkeleton />;

  if (!data?.length) return <EmptyRecords title="There is no Audio!" />;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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

export default PublicProfileUploadsTab;
