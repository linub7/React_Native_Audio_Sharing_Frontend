import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '..';
import {PlayerState} from 'src/@types/player';
import {AudioDataResponse} from 'src/@types/audio';

const initialState: PlayerState = {
  onGoingAudio: null,
  onGoingList: [],
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
  },
});

export const {
  actions: {updateOnGoingAudioAction, updateOnGoingListAction},
} = playerSlice;

export const getPlayerState = createSelector(
  (state: RootState) => state,
  ({player}) => player,
);

export default playerSlice.reducer;
