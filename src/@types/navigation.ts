import {ISignupUserResponse} from 'src/@types/auth';

export type AuthStackParamList = {
  signin: undefined;
  signup: undefined;
  'lost-password': undefined;
  'verify-email': {
    userInfo: ISignupUserResponse;
  };
};
