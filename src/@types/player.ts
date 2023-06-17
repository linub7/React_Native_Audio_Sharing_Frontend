import {AudioDataResponse} from './audio';

export interface PlayerState {
  onGoingAudio: AudioDataResponse | null;
  onGoingList: AudioDataResponse[];
  playbackRate: number;
}
