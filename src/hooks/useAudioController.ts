import deepEqual from 'deep-equal';
import {useEffect} from 'react';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
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

let isReady = false;

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
  const isPlaying = playbackState === State.Playing;
  const isPaused = playbackState === State.Paused;
  const isBusy =
    playbackState === State.Buffering || playbackState === State.Connecting;

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

  const togglePlayPause = async () => {
    if (isPlaying) await TrackPlayer.pause();
    if (isPaused) await TrackPlayer.play();
  };

  const seekTo = async (position: number) => {
    await TrackPlayer.seekTo(position);
  };

  const skipTo = async (sec: number) => {
    const currentPosition = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(currentPosition + sec);
  };

  const onNextPress = async () => {
    const currentList = await TrackPlayer.getQueue();
    const currentIdxOfAudio = await TrackPlayer.getCurrentTrack();
    if (currentIdxOfAudio === null) return;

    const nextIdx = currentIdxOfAudio + 1;

    const nextAudio = currentList[nextIdx];
    if (nextAudio) {
      await TrackPlayer.skipToNext();
      dispatch(updateOnGoingAudioAction(onGoingList[nextIdx]));
    }
  };

  const onPreviousPress = async () => {
    const currentList = await TrackPlayer.getQueue();
    const currentIdxOfAudio = await TrackPlayer.getCurrentTrack();
    if (currentIdxOfAudio === null) return;

    const previousIdx = currentIdxOfAudio - 1;
    const previousAudio = currentList[previousIdx];
    if (previousAudio) {
      await TrackPlayer.skipToPrevious();
      dispatch(updateOnGoingAudioAction(onGoingList[previousIdx]));
    }
  };

  const setPlaybackRate = async (rate: number) => {
    await TrackPlayer.setRate(rate);
  };

  useEffect(() => {
    const setupPlayer = async () => {
      if (isReady) return;

      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
    };

    setupPlayer();
    isReady = true;
  }, []);

  return {
    onAudioPress,
    togglePlayPause,
    seekTo,
    skipTo,
    onNextPress,
    onPreviousPress,
    setPlaybackRate,
    isPlayerReady,
    isPlaying,
    isBusy,
  };
};

export default useAudioController;
