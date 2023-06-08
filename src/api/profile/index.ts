import {string} from 'yup';
import catchAsyncError from '../catchError';
import client from '../client';

export const getRecommendedAudiosByProfileHandler = async (
  token: string | undefined,
) => {
  try {
    const {data} = await client.get(`/profile/recommended`, {
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
export const getUploadsByProfileHandler = async (
  page: string,
  limit: string,
  token: string | undefined,
) => {
  try {
    const {data} = await client.get(
      `/profile/uploads?page=${page}&limit=${limit}`,
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
