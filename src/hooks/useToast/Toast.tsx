import ReactDOM from "react-dom";
import ToastManager from "./ToastManager";
import type { CreateToast } from "./types";

class Toast {
  portal: HTMLElement | null = null;

  createToast: CreateToast | (() => void) = () => {
    console.warn("아직 바인딩 안됨");
  };

  constructor(portalId: string) {
    const portalElement = document.getElementById(portalId);

    if (portalElement) {
      this.portal = portalElement;
    } else {
      this.portal = document.createElement("div");
      this.portal.id = portalId;
      document.body.appendChild(this.portal);
    }

    ReactDOM.render(
      <ToastManager
        bind={(createToast) => {
          this.createToast = createToast;
        }}
      />,
      this.portal
    );
  }

  show(message: string, duration = 2000) {
    this.createToast?.(message, duration);
  }
}

export default Toast;
