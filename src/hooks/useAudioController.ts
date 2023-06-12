import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
} from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';

import {AudioDataResponse} from 'src/@types/audio';
import {getPlayerState, updateOnGoingAudioAction} from 'src/store/player';

const updateQueue = async (data: AudioDataResponse[]) => {
  const lists: Track[] = data.map(el => {
    return {
      id: el.id,
      title: el.title,
      url: el.file,
      artwork: el.poster || require('../assets/music.png'),
      artist: el.owner.name,
      genre: el.category,
      isLiveStream: true,
    };
  });
  await TrackPlayer.add([...lists]);
};

const useAudioController = () => {
  const playbackState = usePlaybackState();
  const {onGoingAudio} = useSelector(getPlayerState);
  const dispatch = useDispatch();

  const isPlayerReady = playbackState !== State.None;

  const onAudioPress = async (
    item: AudioDataResponse,
    data: AudioDataResponse[],
  ) => {
    if (!isPlayerReady) {
      // playing audio for the first time
      await updateQueue(data);
      const idx = data.findIndex(el => el.id === item.id);
      await TrackPlayer.skip(idx);
      await TrackPlayer.play();
      dispatch(updateOnGoingAudioAction(item));
    }

    if (playbackState === State.Playing && onGoingAudio?.id === item.id) {
      // same audio is already playing (handle pause)
      await TrackPlayer.pause();
    }

    if (playbackState === State.Paused && onGoingAudio?.id === item.id) {
      // same audio no need to load handle resume
      await TrackPlayer.play();
    }
  };

  return {onAudioPress};
};

export default useAudioController;
