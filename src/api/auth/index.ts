import {
  IForgotPassword,
  IReVerifyEmail,
  ISigninUser,
  ISignoutUser,
  ISignupUser,
  IVerifyEmail,
} from 'src/@types/auth';
import client from '../client';

export const signupHandler = async (values: ISignupUser) => {
  try {
    const {data} = await client.post(`/auth/signup`, {
      ...values,
    });
    return {data};
  } catch (error: any) {
    const response = error?.response;
    return {err: response?.data?.message};
  }
};

export const signinHandler = async (values: ISigninUser) => {
  try {
    const {data} = await client.post(`/auth/signin`, {
      ...values,
    });
    return {data};
  } catch (error) {
    console.log('error: ', error);
    // const response = error?.response;
    return {err: error};
  }
};

export const signoutHandler = async (
  fromAll: string | undefined = undefined,
  token: string,
) => {
  try {
    const {data} = await client.post(
      `/auth/signout?fromAll=${fromAll}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {data};
  } catch (error: any) {
    const response = error?.response;
    return {err: response?.data?.message};
  }
};

export const forgotPasswordHandler = async (values: IForgotPassword) => {
  try {
    const {data} = await client.post(`/auth/forgot-password`, {
      ...values,
    });
    return {data};
  } catch (error: any) {
    const response = error?.response;
    return {err: response?.data?.message};
  }
};

export const verifyEmailHandler = async (values: IVerifyEmail) => {
  try {
    const {data} = await client.post(`/auth/verify-email`, {
      ...values,
    });
    return {data};
  } catch (error: any) {
    const response = error?.response;
    return {err: response?.data?.message};
  }
};

export const reVerifyEmailHandler = async (userId: string) => {
  try {
    const {data} = await client.post(`/auth/re-verify-email`, {
      userId,
    });
    return {data};
  } catch (error: any) {
    const response = error?.response;
    return {err: response?.data?.message};
  }
};

export const getMeHandler = async (token: string) => {
  try {
    const {data} = await client.get(`/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {data};
  } catch (error: any) {
    const response = error?.response;
    return {err: response?.data?.message};
  }
};
