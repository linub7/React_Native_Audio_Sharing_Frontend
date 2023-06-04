import {createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '..';
import {NotificationState} from 'src/@types/notification';

const initialState: NotificationState = {
  message: '',
  type: 'error',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotificationAction: (state, action) => {
      const {
        payload: {message, type},
      } = action;

      state.message = message;
      state.type = type;
    },
  },
});

export const {
  actions: {updateNotificationAction},
} = notificationSlice;

export const getNotificationState = createSelector(
  (state: RootState) => state,
  ({notification}) => notification,
);

export default notificationSlice.reducer;
