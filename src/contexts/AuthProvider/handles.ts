import { serviceApi } from "service";

export const useHandles = () => {
  const handleGetCurrentUser = (token: string) => {
    const res = serviceApi.getUserData(token);
    return res;
  };

  return { handleGetCurrentUser };
};
