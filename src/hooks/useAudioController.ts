import deepEqual from 'deep-equal';
import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
} from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';

import {AudioDataResponse} from 'src/@types/audio';
import {
  getPlayerState,
  updateOnGoingAudioAction,
  updateOnGoingListAction,
} from 'src/store/player';

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
  const {onGoingAudio, onGoingList} = useSelector(getPlayerState);
  const dispatch = useDispatch();

  const isPlayerReady = playbackState !== State.None;

  const onAudioPress = async (
    item: AudioDataResponse,
    data: AudioDataResponse[],
  ) => {
    if (!isPlayerReady) {
      console.log('playing for the first time');
      // playing audio for the first time
      await updateQueue(data);
      const idx = data.findIndex(el => el.id === item.id);
      await TrackPlayer.skip(idx);
      await TrackPlayer.play();
      dispatch(updateOnGoingAudioAction(item));
      return dispatch(updateOnGoingListAction(data));
    }

    if (playbackState === State.Playing && onGoingAudio?.id === item.id) {
      // same audio is already playing (handle pause)
      return await TrackPlayer.pause();
    }

    if (playbackState === State.Paused && onGoingAudio?.id === item.id) {
      // same audio no need to load handle resume
      return await TrackPlayer.play();
    }

    if (onGoingAudio?.id !== item?.id) {
      console.log('playing new audio');
      const fromSameList = deepEqual(onGoingList, data);

      await TrackPlayer.pause();
      const idx = data.findIndex(el => el.id === item.id);

      if (!fromSameList) {
        // playing new audio from different list
        await TrackPlayer.reset();
        await updateQueue(data);
        dispatch(updateOnGoingListAction(data));
      }
      // playing new audio from same list
      await TrackPlayer.skip(idx);
      await TrackPlayer.play();
      dispatch(updateOnGoingAudioAction(item));
    }
  };

  return {onAudioPress};
};

export default useAudioController;
