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
  audio: string,
  progress: number,
  date: any,
  token: string | undefined,
) => {
  try {
    const {data} = await client.post(
      `/history`,
      {audio, progress, date},
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
