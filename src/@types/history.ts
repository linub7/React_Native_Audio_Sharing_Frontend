import {categoriesTypes} from '@utils/categories';

export interface RecentlyPlayedDataResponse {
  owner: {
    name: string;
    id: string;
  };
  id: string;
  title: string;
  about: string;
  file: string;
  poster?: string;
  category: categoriesTypes;
  date: string;
  progress: number;
}

export interface HistoryByProfile {
  date: string;
  audios: HistoryAudio[];
}

export interface HistoryAudio {
  audioId: string;
  date: string;
  id: string;
  title: string;
}
