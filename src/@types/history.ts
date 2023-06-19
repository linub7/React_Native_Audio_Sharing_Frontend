import {categoriesTypes} from '@utils/categories';

export interface RecentlyPlayedDataResponse {
  owner: {
    name: string;
    id: string;
  };
  id: string;
  title: string;
  file: string;
  poster?: string;
  category: categoriesTypes;
  date: string;
  progress: number;
}

export interface HistoryByProfile {
  date: string;
  audios: {
    audioId: string;
    date: string;
    id: string;
    title: string;
  }[];
}
