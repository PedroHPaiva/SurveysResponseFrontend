import axios from 'axios';

export const USER_SURVEYS_URL = axios.create({
  baseURL: 'http://surveysresponsebackend-production.up.railway.app',
  // baseURL: 'http://localhost:8080',
});
