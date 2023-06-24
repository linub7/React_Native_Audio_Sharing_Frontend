import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';

import {RootState} from '..';
import {PlaylistModalState} from 'src/@types/playlistModal';

const initialState: PlaylistModalState = {
  visible: false,
};

const playlistModalSlice = createSlice({
  name: 'playlistModal',
  initialState,
  reducers: {
    updatePlaylistModalVisibilityAction: (
      state,
      {payload}: PayloadAction<boolean>,
    ) => {
      state.visible = payload;
    },
    updatePlaylistModalSelectedListIdAction: (
      state,
      {payload}: PayloadAction<string>,
    ) => {
      state.selectedListId = payload;
    },
  },
});

export const {
  actions: {
    updatePlaylistModalSelectedListIdAction,
    updatePlaylistModalVisibilityAction,
  },
} = playlistModalSlice;

export const getPlaylistModalState = createSelector(
  (state: RootState) => state,
  ({playlistModal}) => playlistModal,
);

export default playlistModalSlice.reducer;
