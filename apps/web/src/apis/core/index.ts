import type { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { PROXY_PRE_FIX, env } from '~/constants'

type RequestType = 'DEFAULT' | 'FILE'
const getInterceptedInstance = (requestType: RequestType) =>
  setInterceptors(
    axios.create({
      baseURL: `${PROXY_PRE_FIX}${env.SERVICE_API_SUB_FIX}`,
    }),
    requestType
  )

const setInterceptors = (instance: AxiosInstance, requestType: RequestType) => {
  instance.interceptors.request.use((config) => {
    if (requestType === 'FILE') {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    return config
  })

  return instance
}

type SelectedMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'
const attachMethod =
  (method: SelectedMethod) =>
  (axiosInstance: AxiosInstance) =>
  <T = unknown>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise<T> =>
    axiosInstance(url, { method, ...config })

const instance = {
  default: getInterceptedInstance('DEFAULT'),
  file: getInterceptedInstance('FILE'),
}

export const http = {
  get: attachMethod('get')(instance.default),
  post: attachMethod('post')(instance.default),
  patch: attachMethod('patch')(instance.default),
  put: attachMethod('put')(instance.default),
  delete: attachMethod('delete')(instance.default),
  file: {
    get: attachMethod('get')(instance.file),
    post: attachMethod('post')(instance.file),
    patch: attachMethod('patch')(instance.file),
    put: attachMethod('put')(instance.file),
    delete: attachMethod('delete')(instance.file),
  },
} as const
