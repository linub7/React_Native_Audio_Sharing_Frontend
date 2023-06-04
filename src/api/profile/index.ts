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
