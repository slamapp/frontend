import { useEffect, useState } from "react";
import Toast from "./Toast";

const useToast = (portalId = "toast-portal") => {
  const [toast, setToast] = useState<Toast>();
  useEffect(() => setToast(new Toast(portalId)), []);
  return toast as Toast;
};

export default useToast;
