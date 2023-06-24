export interface ISignupUser {
  name: string;
  email: string;
  password: string;
}

export interface ISignupUserResponse {
  id: string;
  name: string;
  email: string;
}

export interface ISigninUser {
  email: string;
  password: string;
}

export interface ISignoutUser {
  token: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IVerifyEmail {
  token: string;
  userId: string;
}

export interface IReVerifyEmail {
  userId: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  avatar?: string;
  followers: number;
  followings: number;
}

export interface PublicProfile {
  id: string;
  name: string;
  avatar?: string;
  followers: number;
}

export interface AuthState {
  profile: UserProfile | null;
  loggedIn: boolean;
  loading: boolean;
}
