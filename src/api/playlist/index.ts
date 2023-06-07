import {ICreateNewPlaylist} from 'src/@types/playlist';
import catchAsyncError from '../catchError';
import client from '../client';

export const getMyPlaylistsHandler = async (
  page: string,
  limit: string,
  token: string | undefined,
) => {
  try {
    const {data} = await client.get(
      `/playlists/me?page=${page}&limit=${limit}`,
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

export const createNewPlaylistHandler = async (
  values: ICreateNewPlaylist,
  token: string | undefined,
) => {
  try {
    const {data} = await client.post(
      `/playlists`,
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
