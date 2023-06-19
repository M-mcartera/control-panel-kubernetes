import { publicAxios } from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    try {
      const response = await publicAxios.get("/auth/refresh", {
        withCredentials: true,
      });
      const { access_token = "" } = response.data;
      setAuth((prev: any) => {
        return { ...prev, token: access_token };
      });
      return access_token;
    } catch {
      console.log("use refresh token error");
    }
  };
  return refresh;
};

export default useRefreshToken;
