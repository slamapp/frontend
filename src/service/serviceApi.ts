import axiosInstance, { API_METHOD } from "./fetcher";

const request = async (config: any) => axiosInstance(config);
export default {
  getUserData: (token: string) =>
    request({
      method: API_METHOD.GET,
      headers: { authorization: `Bearer ${token}` },
      url: "/users/me",
    }),
};
