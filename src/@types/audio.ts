import {categoriesTypes} from '@utils/categories';

export interface AudioDataResponse {
  id: string;
  title: string;
  about: string;
  category: categoriesTypes;
  file: string;
  poster?: string;
  owner: {
    name: string;
    id: string;
  };
}

export interface Playlist {
  id: string;
  title: string;
  itemsCount: number;
  visibility: 'public' | 'private';
}
