import axios from "axios";
import { onFulfilled, onRejected } from "./common";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_SERVICE_API_END_POINT;
axiosInstance.interceptors.response.use(onFulfilled, onRejected);

export default axiosInstance;

export const API_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};
