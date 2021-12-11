import axios from "axios";
import axiosInstance, { API_METHOD } from "./fetcher";

const request = async (config: any) => axiosInstance(config);

export default {
  getServiceToken: ({ kakaoAuthCode }: { kakaoAuthCode: string }) =>
    request({
      method: API_METHOD.POST,
      url: "/join",
      data: { kakaoAuthCode },
    }),

  jsonPlaceholder: () =>
    axios.get("https://jsonplaceholder.typicode.com/todos/1"),
};
