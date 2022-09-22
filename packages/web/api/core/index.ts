import type { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios"
import axios from "axios"
import { getLocalToken } from "~/utils"

const endPoint = process.env.NEXT_PUBLIC_SERVICE_API_END_POINT as string
const subfix = process.env.NEXT_PUBLIC_SERVICE_API_SUB_FIX as string

type RequestType = "DEFAULT" | "AUTH" | "AUTH_FILE"
const getInterceptedInstance = (requestType: RequestType) =>
  setInterceptors(
    axios.create({
      baseURL: endPoint + subfix,
      headers: {
        "Content-Type": "application/json",
      },
    }),
    requestType
  )

const setInterceptors = (instance: AxiosInstance, requestType: RequestType) => {
  instance.interceptors.request.use((config) => ({
    ...config,
    headers: {
      ...config.headers,
      ...((requestType === "AUTH" || requestType === "AUTH_FILE") && {
        Authorization: `Bearer ${getLocalToken()}`,
      }),
      ...(requestType === "AUTH_FILE" && {
        "Content-Type": "multipart/form-data",
      }),
    },
  }))

  return instance
}

type SelectedMethod = "get" | "post" | "patch" | "put" | "delete"
const attachMethod =
  (method: SelectedMethod) =>
  (axiosInstance: AxiosInstance) =>
  <T = unknown>(
    url: string,
    config?: Omit<AxiosRequestConfig, "url" | "method">
  ): AxiosPromise<T> =>
    axiosInstance(url, { method, ...config })

const instance = {
  default: getInterceptedInstance("DEFAULT"),
  auth: getInterceptedInstance("AUTH"),
  authFile: getInterceptedInstance("AUTH_FILE"),
}

export const http = {
  default: {
    get: attachMethod("get")(instance.default),
    post: attachMethod("post")(instance.default),
    patch: attachMethod("patch")(instance.default),
    put: attachMethod("put")(instance.default),
    delete: attachMethod("delete")(instance.default),
  },
  auth: {
    get: attachMethod("get")(instance.auth),
    post: attachMethod("post")(instance.auth),
    patch: attachMethod("patch")(instance.auth),
    put: attachMethod("put")(instance.auth),
    delete: attachMethod("delete")(instance.auth),
  },
  authFile: {
    get: attachMethod("get")(instance.authFile),
    post: attachMethod("post")(instance.authFile),
    patch: attachMethod("patch")(instance.authFile),
    put: attachMethod("put")(instance.authFile),
    delete: attachMethod("delete")(instance.authFile),
  },
} as const
