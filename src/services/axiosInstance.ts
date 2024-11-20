import Cookies from "cookies-ts";

import axios from "axios";

// Create an instance of Axios
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request interceptor
API.interceptors.request.use(
  (config: any) => {
    // You can add authentication tokens or modify headers here
    // .getItem("token"); // Example: getting a token from local storage
  const token = new Cookies().get("AUTH_TOKEN")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Always return the config
  },
  (error: any) => {
    // Handle request errors
    return Promise.reject(error); // Reject the promise to handle in the catch block
  }
);

// Response interceptor
API.interceptors.response.use(
  (response: any) => {
    // Handle the response data here if needed
    return response; // Always return the response
  },
  (error: any) => {
    // Handle response errors
    if (error.response) {
      // Server responded with a status other than 200 range
      //   alert(`Error: ${error.response.data.message || 'An error occurred'}`);
    } else {
      // Network error or other issues
      //   alert('Network error: Unable to connect to the server');
    }
    return Promise.reject(error); // Reject the promise
  }
);

export default API;
