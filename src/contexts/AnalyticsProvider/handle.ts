import GA from "react-ga4";
import { ContextProps } from "./context";

export const sendPageview: ContextProps["sendPageview"] = (
  pathname: string
) => {
  GA.send({ hitType: "pageview", page: pathname });
};
