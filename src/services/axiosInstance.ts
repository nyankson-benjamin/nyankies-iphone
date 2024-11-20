// axiosInstance.js
import axios from 'axios';
import { getToken } from './auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL
const instance = axios.create({
  baseURL: baseUrl, // Your API base URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  },
});
export const pictureInstance = axios.create({
  baseURL: baseUrl, // Your API base URL
  headers: {
    'Content-Type': 'multipart/form-data', // Use multipart/form-data for sending files
    'Authorization': `Bearer ${getToken()}`,
  },
});



export default instance;
