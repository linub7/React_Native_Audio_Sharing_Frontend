import TrackPlayer, {Event} from 'react-native-track-player';
import {updateHistoryHandler} from './api/history';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';

const playbackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async e => {
    const audioList = await TrackPlayer.getQueue();
    const audio = audioList[e.track];
    const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
    if (!token) return;
    const date = new Date(Date.now());
    const {err, data} = await updateHistoryHandler(
      audio.id,
      e.position,
      date,
      token,
    );

    if (err) {
      return console.log(err);
    }
    console.log(data);
  });
};

export default playbackService;
