import {createSelector, createSlice} from '@reduxjs/toolkit';
import {AuthState} from 'src/@types/auth';
import {RootState} from '..';

const initialState: AuthState = {
  profile: null,
  loggedIn: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfileAction: (state, action) => {
      const {
        payload: {profile},
      } = action;
      state.profile = profile;
    },
    updateLoggedInStateAction: (state, action) => {
      const {
        payload: {loggedInState},
      } = action;
      state.loggedIn = loggedInState;
    },
    updateLoadingStateAction: (state, action) => {
      const {
        payload: {loadingState},
      } = action;
      state.loading = loadingState;
    },
  },
});

export const {
  actions: {
    updateProfileAction,
    updateLoggedInStateAction,
    updateLoadingStateAction,
  },
} = authSlice;

export const getAuthState = createSelector(
  (state: RootState) => state,
  ({auth}) => auth,
);

export default authSlice.reducer;
