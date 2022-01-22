import { useContext } from "react";
import Context from "./context";

const useAuthContext = () => useContext(Context);

export default useAuthContext;
