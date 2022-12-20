import type { ComponentProps, ReactElement } from "react"
import { useEffect, useState } from "react"
import type DefaultTemplate from "./DefaultTemplate"
import { useTimeout, useTimeoutFn } from "./hooks"

const DoAfterDuration = ({
  options,
  children,
  onDelayedAfterDone,
  onDone,
  onMount,
}: {
  options: Pick<
    ComponentProps<typeof DefaultTemplate>["options"],
    "delay" | "duration"
  >
  children: (options: { isDone: boolean; doEarly: () => void }) => ReactElement
  onDelayedAfterDone?: () => void
  onDone?: () => void
  onMount?: (mount: { doEarly: () => void }) => void
}) => {
  const [isDone, setIsDone] = useState(false)

  const [runDelayAfterDone] = useTimeoutFn(() => {
    onDelayedAfterDone?.()
  }, options.delay)

  const clearDurationDo = useTimeout(() => {
    doAnyway()
    onDone?.()
  }, options.duration)

  const doAnyway = () => {
    setIsDone(true)
    runDelayAfterDone()
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

export default DoAfterDuration
