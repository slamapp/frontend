import { useContext } from "react";
import { Context } from "./context";

const useNavigationContext = () => useContext(Context);

export default useNavigationContext;
