import {FC, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useProgress} from 'react-native-track-player';
import {useMutation, useQueryClient} from 'react-query';
import Toast from 'react-native-toast-message';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import colors from '@utils/colors';
import {MINI_PLAYER_HEIGHT, generalError} from '@utils/constants';
import {getPlayerState} from 'src/store/player';
import {getSource} from '@utils/helper';
import AudioPlayerIcon from '@ui/audio-player-icon';
import {mapRange} from '@utils/math';
import AudioPlayer from '@components/home/audio-player';
import PlayPauseButton from '@components/shared/play-pause-button';
import CurrentAudioList from '@components/home/current-audio-list';
import {useFetchIsFavoriteAudio} from 'src/hooks/query';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {addToFavoriteHandler} from 'src/api/favorite';
import {HomeNavigatorStackParamList} from 'src/@types/navigation';
import {getAuthState} from 'src/store/auth';

interface Props {}

const MiniAudioPlayer: FC<Props> = ({}) => {
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const [showCurrentList, setShowCurrentList] = useState(false);

  const {navigate} =
    useNavigation<NavigationProp<HomeNavigatorStackParamList>>();

  const {onGoingAudio} = useSelector(getPlayerState);
  const {profile} = useSelector(getAuthState);

  const {data: isFavoriteAudio} = useFetchIsFavoriteAudio(
    onGoingAudio?.id || '',
  );
  const progress = useProgress();

  const source = getSource(onGoingAudio?.poster);

  const queryClient = useQueryClient();

  const toggleIsFavorite = async (id: string) => {
    if (!id) return Toast.show({type: 'error', text1: generalError});
    const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
    if (!token) return Toast.show({type: 'error', text1: generalError});
    const {err, data} = await addToFavoriteHandler(id, token);
    if (err) {
      return Toast.show({type: 'error', text1: err});
    }
  };

  const favoriteMutation = useMutation({
    mutationFn: async id => toggleIsFavorite(id),
    onMutate: (id: string) => {
      queryClient.setQueryData<boolean>(
        ['is-favorite-audio', onGoingAudio?.id],
        oldData => !oldData,
      );
    },
  });

  const closePlayerModal = () => setPlayerVisibility(false);
  const showPlayerModal = () => setPlayerVisibility(true);

  const handleOnCurrentListClose = () => setShowCurrentList(false);
  const handleOnCurrentListOpen = () => {
    closePlayerModal();
    setShowCurrentList(true);
  };

  const handleOnProfileLinkPress = () => {
    closePlayerModal();
    if (profile?.id === onGoingAudio?.owner.id) {
      navigate('profile-navigator');
    } else {
      navigate('public-profile', {
        profileId: onGoingAudio?.owner.id || '',
      });
    }
  };

  return (
    <>
      <View
        style={{
          height: 3,
          backgroundColor: colors.SECONDARY,
          width: `${mapRange({
            outputMin: 0,
            outputMax: 100,
            inputMin: 0,
            inputMax: progress.duration,
            inputValue: progress.position,
          })}%`,
        }}
      />
      <View style={styles.container}>
        <Image source={source} style={styles.poster} />
        <Pressable onPress={showPlayerModal} style={styles.contentContainer}>
          <Text style={styles.title}>{onGoingAudio?.title}</Text>
          <Text style={styles.name}>{onGoingAudio?.owner.name}</Text>
        </Pressable>
        <AudioPlayerIcon
          name={isFavoriteAudio ? 'heart' : 'hearto'}
          size={24}
          color={colors.CONTRAST}
          containerStyle={styles.heartIcon}
          onPress={() => favoriteMutation.mutate(onGoingAudio?.id || '')}
        />
        <PlayPauseButton color={colors.CONTRAST} />
      </View>

      <AudioPlayer
        onRequestClose={closePlayerModal}
        visible={playerVisibility}
        handleOnListOptionPress={handleOnCurrentListOpen}
        onProfileLinkPress={handleOnProfileLinkPress}
      />

      <CurrentAudioList
        visible={showCurrentList}
        onRequestClose={handleOnCurrentListClose}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: MINI_PLAYER_HEIGHT,
    backgroundColor: colors.PRIMARY,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    padding: 5,
  },
  poster: {
    height: MINI_PLAYER_HEIGHT - 10,
    width: MINI_PLAYER_HEIGHT - 10,
    borderRadius: 5,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '700',
    paddingHorizontal: 5,
  },
  name: {
    color: colors.SECONDARY,
    fontWeight: '700',
    paddingHorizontal: 5,
  },
  heartIcon: {
    paddingHorizontal: 10,
  },
  button: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MiniAudioPlayer;
