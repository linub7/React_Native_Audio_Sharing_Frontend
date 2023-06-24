import {AudioDataResponse} from './audio';

export interface ICreateNewPlaylist {
  title: string;
  visibility: string;
  resId?: string;
}

export interface Playlist {
  id: string;
  title: string;
  itemsCount: number;
  visibility: 'public' | 'private';
}

export interface IUpdatePlaylist {
  title: string;
  item?: string;
  visibility?: string;
}

export interface PublicProfilePlaylistAudios {
  id: string;
  title: string;
  audios: AudioDataResponse[];
}
