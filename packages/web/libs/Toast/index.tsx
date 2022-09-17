import type {
  ComponentPropsWithoutRef,
  FunctionComponent,
  ReactNode,
} from "react"
import { hydrateRoot } from "react-dom/client"
import { Context } from "./context"
import type DefaultTemplate from "./DefaultTemplate"
import Manager from "./Manager"

class Toast<ExtraOptions extends { [x: string]: any }> {
  portal: HTMLElement | null = null

  createToast:
    | Parameters<ComponentPropsWithoutRef<typeof Manager>["bind"]>[0]
    | null = null

  defaultOptions: ComponentPropsWithoutRef<typeof DefaultTemplate>["options"] =
    {
      duration: 2000,
      delay: 200,
      status: null,
    }

  constructor({
    zIndex = 9999,
    portalId = "toast-portal",
    Template,
    Adapter = ({ children }) => <>{children}</>,
    defaultOptions,
  }: {
    zIndex?: number
    portalId?: string
    Adapter?: FunctionComponent<{ children: ReactNode }>
    Template?: FunctionComponent<
      { content: ReactNode } & Pick<
        ComponentPropsWithoutRef<typeof DefaultTemplate>,
        "close" | "isShow"
      > & {
          options: Pick<
            ComponentPropsWithoutRef<typeof DefaultTemplate>["options"],
            "delay" | "duration" | "status"
          > &
            ExtraOptions
        }
    >
    defaultOptions?: Partial<
      ComponentPropsWithoutRef<typeof DefaultTemplate>["options"]
    >
  } = {}) {
    this.defaultOptions = {
      ...this.defaultOptions,
      ...defaultOptions,
    }

    if (typeof document !== "undefined") {
      const portalElement = document.getElementById(portalId)

      if (portalElement) {
        this.portal = portalElement
      } else {
        const newPortal = document.createElement("div")
        newPortal.id = portalId
        newPortal.style.cssText = `
          left: 0;
          right: 0;
          bottom: 0;
          z-index: ${zIndex};
          position: fixed;
        `
        this.portal = newPortal
        document.body.appendChild(this.portal)
      }

      hydrateRoot(
        this.portal,
        <Adapter>
          <Context.Provider
            value={{
              Template: Template as ComponentPropsWithoutRef<
                typeof Context.Provider
              >["value"]["Template"],
            }}
          >
            <Manager
              bind={(createToast) => {
                this.createToast = createToast
              }}
            />
          </Context.Provider>
        </Adapter>
      )
    }
  }

  show(
    content: ComponentPropsWithoutRef<typeof DefaultTemplate>["content"],
    options?: ExtraOptions &
      Partial<ComponentPropsWithoutRef<typeof DefaultTemplate>["options"]>
  ) {
    this.createToast?.(content, { ...this.defaultOptions, ...options })
  }
}

export default Toast
