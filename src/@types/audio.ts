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

export interface StaleAudio {
  audio: string;
  progress: number;
  date: Date;
}
