import {StaleAudio} from 'src/@types/audio';
import catchAsyncError from '../catchError';
import client from '../client';

export const getMyHistoryHandler = async (token: string | undefined) => {
  try {
    const {data} = await client.get(`/history/recently-played`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {data};
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return {err: errorMessage};
  }
};

export const updateHistoryHandler = async (
  values: StaleAudio,
  token: string | undefined,
) => {
  try {
    const {data} = await client.post(
      `/history`,
      {...values},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {data};
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return {err: errorMessage};
  }
};

export const getHistoryByProfileHandler = async (
  page: string,
  limit: string,
  token: string | undefined,
) => {
  try {
    const {data} = await client.get(`/history?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {data};
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return {err: errorMessage};
  }
};

export const clearAllHistoryHandler = async (
  all: string | undefined,
  token: string | undefined,
) => {
  try {
    const {data} = await client.delete(`/history?all=${all}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {data};
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return {err: errorMessage};
  }
};

export const clearHistoriesHandler = async (
  histories: any,
  token: string | undefined,
) => {
  try {
    const {data} = await client.delete(`/history?histories=${histories}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {data};
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return {err: errorMessage};
  }
};
