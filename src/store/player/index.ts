import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';

import {RootState} from '..';
import {PlayerState} from 'src/@types/player';
import {AudioDataResponse} from 'src/@types/audio';

const initialState: PlayerState = {
  onGoingAudio: null,
  onGoingList: [],
  playbackRate: 1,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updateOnGoingAudioAction: (
      state,
      {payload}: PayloadAction<AudioDataResponse | null>,
    ) => {
      state.onGoingAudio = payload;
    },
    updateOnGoingListAction: (
      state,
      {payload}: PayloadAction<AudioDataResponse[]>,
    ) => {
      state.onGoingList = payload;
    },
    updatePlaybackRateAction: (state, {payload}: PayloadAction<number>) => {
      state.playbackRate = payload;
    },
  },
});

export const {
  actions: {
    updateOnGoingAudioAction,
    updateOnGoingListAction,
    updatePlaybackRateAction,
  },
} = playerSlice;

export const getPlayerState = createSelector(
  (state: RootState) => state,
  ({player}) => player,
);

export default playerSlice.reducer;
