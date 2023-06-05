import catchAsyncError from '../catchError';
import client from '../client';

export const addToFavoriteHandler = async (
  audioId: string,
  token: string | undefined,
) => {
  try {
    const {data} = await client.post(`/favorites?audioId=${audioId}`, null, {
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
