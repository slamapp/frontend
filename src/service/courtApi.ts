import { request, authRequest, authFileRequest } from "./fetcher";

const courtApi = {
  createNewCourt: (data: any) => authRequest.post(`/courts/new`, data),
};

export default courtApi;
