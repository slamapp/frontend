import type {
  ComponentPropsWithoutRef,
  FunctionComponent,
  ReactNode,
} from "react"
import { createContext } from "react"
import type DefaultList from "./DefaultList"
import type DefaultTemplate from "./DefaultTemplate"

export const Context = createContext<{
  List?: FunctionComponent<ComponentPropsWithoutRef<typeof DefaultList>>
  Template?: FunctionComponent<
    { content: ReactNode } & Pick<
      ComponentPropsWithoutRef<typeof DefaultTemplate>,
      "close" | "isShow"
    > & {
        options: Pick<
          ComponentPropsWithoutRef<typeof DefaultTemplate>["options"],
          "delay" | "duration" | "status"
        > & { [x: string]: any }
      }
  >
}>({})
