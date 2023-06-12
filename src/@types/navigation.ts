import {ISignupUserResponse} from 'src/@types/auth';

export type AuthStackParamList = {
  signin: undefined;
  signup: undefined;
  'lost-password': undefined;
  'verify-email': {
    userInfo: ISignupUserResponse;
  };
};

export type ProfileNavigatorStackParamList = {
  profile: undefined;
  'profile-settings': undefined;
  'verify-email': {
    userInfo: ISignupUserResponse;
  };
};

export type PossibleNavigators = {
  'profile-settings': undefined;
  signin: undefined;
};
