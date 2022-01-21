import { useLocalStorage } from "..";

const tokenKey = process.env.NEXT_PUBLIC_SLAM_LOCAL_TOKEN_KEY as string;
export default () => useLocalStorage(tokenKey, "");
