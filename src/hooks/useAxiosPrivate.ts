import { privateAxios } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = privateAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization "]) {
          if (auth?.token) {
            config.headers["Authorization "] = `Bearer ${auth?.token}`;
          } else if (!auth?.token && localStorage.getItem("token")) {
            config.headers["Authorization "] = `Bearer ${localStorage.getItem(
              "token"
            )}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newRefreshToken = await refresh();
          console.log("newRefreshToken", newRefreshToken);
          prevRequest.headers.Authorization = `Bearer ${newRefreshToken}`;
          return privateAxios(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      privateAxios.interceptors.request.eject(requestIntercept);
      privateAxios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return privateAxios;
};

export default useAxiosPrivate;
