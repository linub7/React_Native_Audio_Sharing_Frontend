import axios from 'axios';
import {BACKEND_URL} from '@env';

const client = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
});

export default client;
