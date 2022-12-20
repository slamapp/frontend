import type { ComponentProps } from "react"
import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "./context"
import DefaultList from "./DefaultList"
import DefaultTemplate from "./DefaultTemplate"
import DoAfterDuration from "./DoAfterDuration"
import { iterateCallWithDelay } from "./helpers"
import { useIsMounted } from "./hooks"

type CloseSelf = () => void

const Manager = ({
  bind,
}: {
  bind: (
    createToast: (
      content: ComponentProps<typeof DefaultTemplate>["content"],
      options: ComponentProps<typeof DefaultTemplate>["options"] &
        ComponentProps<typeof DefaultList>["options"]
    ) => CloseSelf
  ) => void
}) => {
  const isMounted = useIsMounted()

  const { Template = DefaultTemplate, List = DefaultList } = useContext(Context)

  const [toastItems, setToastItems] = useState<
    (Pick<ComponentProps<typeof DefaultTemplate>, "content"> & {
      id: string
    } & Pick<ComponentProps<typeof DefaultTemplate>, "options"> &
      Pick<ComponentProps<typeof DefaultList>, "options">)[]
  >([])

  useEffect(() => {
    bind((content, options) => {
      const id = `${new Date().getTime()}`
      setToastItems((old) => [...old, { id, content, options }])

      const close = () =>
        setToastItems((old) => old.filter((toastItem) => toastItem.id !== id))

      return close
    })
  }, [bind])

  const closes = useRef<ComponentProps<typeof DefaultTemplate>["close"][]>([])

  const closeAll = () => {
    iterateCallWithDelay(closes.current, 20)
    closes.current = []
  }

  return isMounted ? (
    <List
      options={{
        marginBottom:
          toastItems[toastItems.length - 1]?.options?.marginBottom ?? 0,
      }}
      templates={toastItems.map(({ id, content: Content, options }) => (
        <DoAfterDuration
          key={id}
          options={{
            delay: options.delay,
            duration: options.duration,
          }}
          onDelayedAfterDone={() =>
            setToastItems((oldToastItems) =>
              oldToastItems.filter((toast) => toast.id !== id)
            )
          }
          onMount={({ doEarly }) => closes.current.push(doEarly)}
        >
          {({ isDone: isClosed, doEarly: close }) => (
            <Template
              options={options}
              isShow={!isClosed}
              close={close}
              closeAll={closeAll}
              content={
                typeof Content === "function" ? (
                  <Content
                    close={close}
                    isShow={!isClosed}
                    options={options}
                    closeAll={closeAll}
                  />
                ) : (
                  Content
                )
              }
            />
          )}
        </DoAfterDuration>
      ))}
    />
  ) : null
}

export default Manager
