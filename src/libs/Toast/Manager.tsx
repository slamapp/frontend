import type { ReactElement, ComponentProps } from "react"
import { useRef, useContext, useEffect, useState } from "react"
import { Context } from "./context"
import DefaultTemplate from "./DefaultTemplate"
import { iterateCallWithDelay } from "./helpers"
import { useTimeout, useTimeoutFn } from "./hooks"

const Manager = ({
  bind,
}: {
  bind: (
    createToast: (
      content: ComponentProps<typeof DefaultTemplate>["content"],
      options: ComponentProps<typeof DefaultTemplate>["options"]
    ) => void
  ) => void
}) => {
  const { Template = DefaultTemplate } = useContext(Context)

  const [toastItems, setToastItems] = useState<
    (Pick<ComponentProps<typeof DefaultTemplate>, "content" | "options"> & {
      id: string
    })[]
  >([])

  useEffect(() => {
    bind((content, options) => {
      const id = `${new Date().getTime()}`

      return setToastItems((old) => [...old, { id, content, options }])
    })
  }, [bind])

  const closes = useRef<ComponentProps<typeof DefaultTemplate>["close"][]>([])

  const closeAll = () => {
    iterateCallWithDelay(closes.current, 20)
    closes.current = []
  }

  return (
    <>
      {toastItems.map(({ id, content: Content, options }) => {
        return (
          <DoAfterDuration
            key={id}
            options={{
              delay: options.delay,
              duration: options.duration,
            }}
            onDelayed={() =>
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
        )
      })}
    </>
  )
}

export default Manager

const DoAfterDuration = ({
  options,
  children,
  onDelayed,
  onDone,
  onMount,
}: {
  options: Pick<
    ComponentProps<typeof DefaultTemplate>["options"],
    "delay" | "duration"
  >
  children: (options: { isDone: boolean; doEarly: () => void }) => ReactElement
  onDelayed?: () => void
  onDone?: () => void
  onMount?: (mount: { doEarly: () => void }) => void
}) => {
  const [isDone, setIsDone] = useState(false)

  const [runAfterDone] = useTimeoutFn(() => {
    onDelayed?.()
  }, options.delay)

  const clearDurationDo = useTimeout(() => {
    doAnyway()
    onDone?.()
  }, options.duration)

  const doAnyway = () => {
    setIsDone(true)
    runAfterDone()
  }

  const doEarly = () => {
    clearDurationDo()
    doAnyway()
  }

  useEffect(() => {
    onMount?.({ doEarly })
  }, [])

  return <>{children({ isDone, doEarly })}</>
}
