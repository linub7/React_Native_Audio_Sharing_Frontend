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
