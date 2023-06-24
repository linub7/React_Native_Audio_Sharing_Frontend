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

export type HomeNavigatorStackParamList = {
  home: undefined;
  'profile-navigator': undefined;
  'public-profile': {
    profileId: string;
  };
};

export type PublicProfileTabParamList = {
  'public-uploads': {
    profileId: string;
  };
  'public-playlist': {
    profileId: string;
  };
};

export type PossibleNavigators = {
  'profile-settings': undefined;
  signin: undefined;
};
