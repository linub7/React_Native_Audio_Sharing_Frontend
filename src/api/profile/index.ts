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

export const updateProfileHandler = async (
  formData: FormData,
  token: string,
) => {
  try {
    const {data} = await client.post(`/auth/update-profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data;',
      },
    });
    return {data};
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return {err: errorMessage};
  }
};

export const getPublicProfileHandler = async (profileId: string) => {
  try {
    const {data} = await client.get(`/profile/infos/${profileId}`);
    return {data};
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return {err: errorMessage};
  }
};

export const getPublicProfileUploadsHandler = async (
  page: string,
  limit: string,
  profileId: string,
) => {
  try {
    const {data} = await client.get(
      `/profile/uploads/${profileId}?page=${page}&limit=${limit}`,
    );
    return {data};
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return {err: errorMessage};
  }
};

export const getPublicProfilePlaylistHandler = async (
  page: string,
  limit: string,
  profileId: string,
) => {
  try {
    const {data} = await client.get(
      `/profile/playlists/${profileId}?page=${page}&limit=${limit}`,
    );
    return {data};
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return {err: errorMessage};
  }
};

export const getPublicPlaylistAudiosHandler = async (
  page: string,
  limit: string,
  playlistId: string,
) => {
  try {
    const {data} = await client.get(
      `/profile/playlists-audios/${playlistId}?page=${page}&limit=${limit}`,
    );
    return {data};
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return {err: errorMessage};
  }
};
