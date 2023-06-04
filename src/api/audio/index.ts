import catchAsyncError from '../catchError';
import client from '../client';

export const getLatestUploadsHandler = async () => {
  try {
    const {data} = await client.get(`/audios/latest-uploads`);
    return {data};
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return {err: errorMessage};
  }
};
