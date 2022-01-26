import { AxiosResponse } from "axios";

export type ApiPromise<Data = any> = Promise<AxiosResponse<Data>>;
