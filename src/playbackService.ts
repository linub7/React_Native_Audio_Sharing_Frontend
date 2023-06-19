import TrackPlayer, {Event} from 'react-native-track-player';
import {updateHistoryHandler} from './api/history';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {debounce} from '@utils/helper';
import {StaleAudio} from './@types/audio';

const sendHistory = async (staleAudio: StaleAudio) => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  if (!token) return;
  const date = new Date(Date.now());
  const {err, data} = await updateHistoryHandler(staleAudio, token);

  if (err) {
    return console.log(err);
  }
  console.log(data);
};

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
    const lists = await TrackPlayer.getQueue();
    const audio = lists[e.track];
    const staleAudio = {
      audio: audio.id,
      progress: e.position,
      date: new Date(Date.now()),
    };
    const debounceHistory = debounce(sendHistory, 100);
    debounceHistory(staleAudio);
  });
};

export default playbackService;
