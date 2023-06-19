import axios from "axios";

export const publicAxios = axios.create({
  baseURL: "http://localhost:3000",
});

export const privateAxios = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});
