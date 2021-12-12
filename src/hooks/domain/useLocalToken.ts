import { useLocalStorage } from "..";

const tokenKey = "slam_token";
export default () => useLocalStorage(tokenKey, "");
