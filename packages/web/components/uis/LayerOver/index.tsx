import type { ReactNode } from "react"
import { createContext, useMemo } from "react"
import { createPortal } from "react-dom"
import { useDisclosure } from "./hooks"

const Context = createContext({} as ReturnType<typeof useDisclosure>)

type Props = {
  portalId?: string
  trigger:
    | ReactNode
    | ((
        args: Pick<
          ReturnType<typeof useDisclosure>,
          "open" | "isOpen" | "toggle"
        >
      ) => ReactNode)
  layer:
    | ReactNode
    | ((
        args: Pick<ReturnType<typeof useDisclosure>, "close" | "isOpen">
      ) => ReactNode)
  options?: Parameters<typeof useDisclosure>[0]
}

const LayerOver = ({ portalId, trigger, options, layer }: Props) => {
  const layoverId = portalId || "layover-portal"

  const { isOpen, close, open, toggle } = useDisclosure({
    ...options,
    onClose: () => {
      options?.onClose?.()
    },
  })

  const portal = useMemo<HTMLElement | null>(() => {
    if (typeof document !== "undefined") {
      const portalEl = document.getElementById(layoverId)

      if (portalEl) {
        return portalEl
      } else {
        const newPortalEl = document.createElement("div")
        newPortalEl.id = layoverId
        newPortalEl.style.cssText = `left: 0; top: 0; position: fixed; z-index:9999;`
        document.body.appendChild(newPortalEl)

        return newPortalEl
      }
    }

    return null
  }, [layoverId])

  return (
    <Context.Provider value={{ isOpen, close, open, toggle }}>
      {typeof trigger === "function"
        ? trigger({ isOpen, open, toggle })
        : trigger}
      {portal &&
        createPortal(
          typeof layer === "function" ? layer({ isOpen, close }) : layer,
          portal
        )}
    </Context.Provider>
  )
}

export default LayerOver
