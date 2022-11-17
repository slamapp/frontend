import type {
  ComponentPropsWithoutRef,
  FunctionComponent,
  ReactNode,
} from "react"
import { hydrateRoot } from "react-dom/client"
import { Context } from "./context"
import type DefaultList from "./DefaultList"
import type DefaultTemplate from "./DefaultTemplate"
import Manager from "./Manager"

class Toast<ExtraOptions extends { [x: string]: any }> {
  portal: HTMLElement | null = null

  createToast: Parameters<ComponentPropsWithoutRef<typeof Manager>["bind"]>[0] =
    () => () => {}

  defaultOptions: ComponentPropsWithoutRef<typeof DefaultTemplate>["options"] &
    ComponentPropsWithoutRef<typeof DefaultList>["options"] = {
    duration: 2000,
    delay: 200,
    status: null,
    marginBottom: 0,
  }

  constructor({
    zIndex = 9999,
    portalId = "toast-portal",
    Adapter = ({ children }) => <>{children}</>,
    List,
    Template,
    defaultOptions,
  }: {
    zIndex?: number
    portalId?: string
    Adapter?: FunctionComponent<{ children: ReactNode }>
    List?: FunctionComponent<
      { templates: ReactNode } & {
        options: ExtraOptions &
          Omit<
            Pick<
              ComponentPropsWithoutRef<typeof DefaultList>["options"],
              "marginBottom"
            >,
            keyof ExtraOptions
          >
      }
    >
    Template?: FunctionComponent<
      { content: ReactNode } & Pick<
        ComponentPropsWithoutRef<typeof DefaultTemplate>,
        "close" | "isShow"
      > & {
          options: ExtraOptions &
            Omit<
              Pick<
                ComponentPropsWithoutRef<typeof DefaultTemplate>["options"],
                "delay" | "duration" | "status"
              >,
              keyof ExtraOptions
            >
        }
    >
    defaultOptions?: Partial<
      ComponentPropsWithoutRef<typeof DefaultTemplate>["options"] &
        ComponentPropsWithoutRef<typeof DefaultList>["options"]
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
        <Context.Provider
          value={{
            List: List as ComponentPropsWithoutRef<
              typeof Context.Provider
            >["value"]["List"],
            Template: Template as ComponentPropsWithoutRef<
              typeof Context.Provider
            >["value"]["Template"],
          }}
        >
          <Adapter>
            <Manager
              bind={(createToast) => {
                this.createToast = createToast
              }}
            />
          </Adapter>
        </Context.Provider>
      )
    }
  }

  show(
    content: ComponentPropsWithoutRef<typeof DefaultTemplate>["content"],
    options?: ExtraOptions &
      (Partial<
        Omit<
          ComponentPropsWithoutRef<typeof DefaultTemplate>["options"],
          keyof ExtraOptions
        >
      > &
        Partial<
          Omit<
            ComponentPropsWithoutRef<typeof DefaultList>["options"],
            keyof ExtraOptions
          >
        >)
  ) {
    return this.createToast(content, { ...this.defaultOptions, ...options })
  }
}

export default Toast
