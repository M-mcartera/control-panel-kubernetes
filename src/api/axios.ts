import axios from "axios";

export const publicAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const privateAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});
