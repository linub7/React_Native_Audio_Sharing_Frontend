import {FC, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import ProfileAudioItem from '@ui/audio-item/profile';
import {useFetchUploadsByProfile} from 'src/hooks/query';
import ProfileTopBarsSkeleton from '@ui/skeletons/profile-top-bars';
import EmptyRecords from '@ui/empty-records';
import useAudioController from 'src/hooks/useAudioController';
import {getPlayerState} from 'src/store/player';
import {AudioDataResponse} from 'src/@types/audio';
import OptionsModal from '@components/home/modals/options';
import colors from '@utils/colors';
import {ProfileNavigatorStackParamList} from 'src/@types/navigation';

interface Props {}

const UploadsTab: FC<Props> = props => {
  const [visible, setVisible] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioDataResponse>();

  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  const {data, isLoading} = useFetchUploadsByProfile();
  const {onAudioPress} = useAudioController();
  const {onGoingAudio} = useSelector(getPlayerState);

  const handleOnLongPress = (item: AudioDataResponse) => {
    setSelectedAudio(item);
    setVisible(true);
  };

  const handleNavigate = () => {
    setVisible(false);
    if (selectedAudio) navigate('edit-audio', {audio: selectedAudio});
  };

  if (isLoading) return <ProfileTopBarsSkeleton />;

  if (!data?.length) return <EmptyRecords title="There is no Audio!" />;

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {data?.map((item, index) => (
          <ProfileAudioItem
            name={item.owner.name}
            title={item.title}
            key={index}
            uri={item?.poster}
            onPress={() => onAudioPress(item, data)}
            isPlaying={onGoingAudio?.id === item.id}
            onLongPress={() => handleOnLongPress(item)}
          />
        ))}
      </ScrollView>
      <OptionsModal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        options={[
          {
            title: 'Edit',
            icon: 'edit',
            onPress: handleNavigate,
          },
        ]}
        renderItem={item => (
          <Pressable onPress={item.onPress} style={styles.optionContainer}>
            <AntDesign size={24} color={colors.PRIMARY} name={item.icon} />
            <Text style={styles.optionTitle}>{item.title}</Text>
          </Pressable>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  optionContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionTitle: {
    color: colors.PRIMARY,
    fontSize: 16,
    marginLeft: 5,
  },
});

export default UploadsTab;
