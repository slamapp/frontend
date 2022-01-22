import { useContext } from "react";
import { Context } from "./context";

const useSocketContext = () => useContext(Context);

export default useSocketContext;
