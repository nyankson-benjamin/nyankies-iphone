import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Create an instance of Axios
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request interceptor
API.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // You can add authentication tokens or modify headers here
    const token = localStorage.getItem('token'); // Example: getting a token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request sent: ', config);
    return config; // Always return the config
  },
  (error: AxiosError) => {
    // Handle request errors
    console.error('Request error: ', error);
    return Promise.reject(error); // Reject the promise to handle in the catch block
  }
);

// Response interceptor
API.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle the response data here if needed
    console.log('Response received: ', response);
    return response; // Always return the response
  },
  (error: AxiosError) => {
    // Handle response errors
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Response error: ', error.response.data);
      alert(`Error: ${error.response.data.message || 'An error occurred'}`);
    } else {
      // Network error or other issues
      console.error('Network error: ', error);
      alert('Network error: Unable to connect to the server');
    }
    return Promise.reject(error); // Reject the promise
  }
);

export default API;
