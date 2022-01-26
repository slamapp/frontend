import getLocalToken from "@utils/getLocalToken";
import { AxiosRequestConfig } from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const fileHeaders = {
  "Content-Type": "multipart/form-data",
};

export type InterceptorOption = {
  config: AxiosRequestConfig;
  isNeedToken?: boolean;
  isFileData?: boolean;
};

export const req = {
  onFulfilled: ({
    config,
    isNeedToken = false,
    isFileData = false,
  }: InterceptorOption) => {
    config.headers = {
      ...defaultHeaders,
      ...(isNeedToken ? { Authorization: `Bearer ${getLocalToken()}` } : {}),
    };

    if (isFileData) {
      config.headers = {
        ...fileHeaders,
      };
    }

    return config;
  },
  onRejected: (error: any) => Promise.reject(error),
};

export const res = {
  onFulfilled: (response: any) => response,
  onRejected: (error: any) => Promise.reject(error),
};
