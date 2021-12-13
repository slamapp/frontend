import axios from "axios";
import { setInterceptors } from "./interceptor";
import { requestTypes } from "./type";

const baseURL = process.env.NEXT_PUBLIC_SERVICE_API_END_POINT as string;

const request = setInterceptors(
  axios.create({ baseURL }),
  requestTypes.DEFAULT
);
const authRequest = setInterceptors(
  axios.create({ baseURL }),
  requestTypes.AUTH
);
const authFileRequest = setInterceptors(
  axios.create({ baseURL }),
  requestTypes.AUTH_FILE
);

export { request, authRequest, authFileRequest };
