import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '..';
import {PlayerState} from 'src/@types/player';
import {AudioDataResponse} from 'src/@types/audio';

const initialState: PlayerState = {
  onGoingAudio: null,
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
  },
});

export const {
  actions: {updateOnGoingAudioAction},
} = playerSlice;

export const getPlayerState = createSelector(
  (state: RootState) => state,
  ({player}) => player,
);

export default playerSlice.reducer;
