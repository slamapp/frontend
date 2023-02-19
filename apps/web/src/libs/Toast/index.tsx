import type { ComponentProps, ComponentPropsWithoutRef, FunctionComponent, ReactElement, ReactNode } from 'react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { iterateCallWithDelay } from './helpers'
import { useIsMounted, useTimeout, useTimeoutFn } from './hooks'

type CloseSelf = () => void

const Manager = ({
  bind,
}: {
  bind: (
    createToast: (
      content: ComponentProps<typeof DefaultTemplate>['content'],
      options: ComponentProps<typeof DefaultTemplate>['options'] & ComponentProps<typeof DefaultList>['options']
    ) => CloseSelf
  ) => void
}) => {
  const isMounted = useIsMounted()

  const { Template = DefaultTemplate, List = DefaultList } = useContext(Context)

  const [toastItems, setToastItems] = useState<
    (Pick<ComponentProps<typeof DefaultTemplate>, 'content'> & {
      id: string
    } & Pick<ComponentProps<typeof DefaultTemplate>, 'options'> &
      Pick<ComponentProps<typeof DefaultList>, 'options'>)[]
  >([])

  useEffect(() => {
    bind((content, options) => {
      const id = `${new Date().getTime()}`
      setToastItems((old) => [...old, { id, content, options }])

      const close = () => setToastItems((old) => old.filter((toastItem) => toastItem.id !== id))

      return close
    })
  }, [bind])

  const closes = useRef<ComponentProps<typeof DefaultTemplate>['close'][]>([])

  const closeAll = () => {
    iterateCallWithDelay(closes.current, 20)
    closes.current = []
  }

  return isMounted ? (
    <List
      options={{
        marginBottom: toastItems[toastItems.length - 1]?.options?.marginBottom ?? 0,
      }}
      templates={toastItems.map(({ id, content: Content, options }) => (
        <DoAfterDuration
          key={id}
          options={{
            delay: options.delay,
            duration: options.duration,
          }}
          onDelayedAfterDone={() => setToastItems((oldToastItems) => oldToastItems.filter((toast) => toast.id !== id))}
          onMount={({ doEarly }) => closes.current.push(doEarly)}
        >
          {({ isDone: isClosed, doEarly: close }) => (
            <Template
              options={options}
              isShow={!isClosed}
              close={close}
              closeAll={closeAll}
              content={
                typeof Content === 'function' ? (
                  <Content close={close} isShow={!isClosed} options={options} closeAll={closeAll} />
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

const DoAfterDuration = ({
  options,
  children,
  onDelayedAfterDone,
  onDone,
  onMount,
}: {
  options: Pick<ComponentProps<typeof DefaultTemplate>['options'], 'delay' | 'duration'>
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

interface ToastTemplateProps {
  isShow: boolean
  options: {
    duration: number
    delay: number
    status: 'success' | 'warning' | 'error' | 'info' | null
  }
  close: () => void
  closeAll: () => void
}

const DefaultTemplate: FunctionComponent<
  {
    content: FunctionComponent<ToastTemplateProps> | ReactNode
  } & ToastTemplateProps
> = ({ content: Content, isShow, options, close, closeAll }) => (
  <div
    style={{
      position: 'relative',
      display: 'flex',
      maxWidth: 450,
      margin: '0 16px 16px 16px',
      height: 70,
      padding: '0 20px',
      alignItems: 'center',
      borderRadius: 4,
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      opacity: isShow ? 1 : 0,
    }}
  >
    {typeof Content === 'function' ? (
      <Content isShow={isShow} close={close} closeAll={closeAll} options={options} />
    ) : (
      Content
    )}
  </div>
)

type DefaultListProps = {
  templates: ReactNode
  options: {
    marginBottom: number
  }
}

const DefaultList = ({ templates, options: { marginBottom } }: DefaultListProps) => (
  <div
    style={{
      marginBottom,
      transition: 'marginBottom 200ms',
    }}
  >
    {templates}
  </div>
)

export const Context = createContext<{
  List?: FunctionComponent<ComponentPropsWithoutRef<typeof DefaultList>>
  Template?: FunctionComponent<
    { content: ReactNode } & Pick<ComponentPropsWithoutRef<typeof DefaultTemplate>, 'close' | 'isShow'> & {
        options: Pick<ComponentPropsWithoutRef<typeof DefaultTemplate>['options'], 'delay' | 'duration' | 'status'> & {
          [x: string]: any
        }
      }
  >
}>({})

class Toast<ExtraOptions extends { [x: string]: any }> {
  portal: HTMLElement | null = null

  createToast: Parameters<ComponentPropsWithoutRef<typeof Manager>['bind']>[0] = () => () => {}

  defaultOptions: ComponentPropsWithoutRef<typeof DefaultTemplate>['options'] &
    ComponentPropsWithoutRef<typeof DefaultList>['options'] = {
    duration: 2000,
    delay: 200,
    status: null,
    marginBottom: 0,
  }

  constructor({
    zIndex = 9999,
    portalId = 'toast-portal',
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
          Omit<Pick<ComponentPropsWithoutRef<typeof DefaultList>['options'], 'marginBottom'>, keyof ExtraOptions>
      }
    >
    Template?: FunctionComponent<
      { content: ReactNode } & Pick<ComponentPropsWithoutRef<typeof DefaultTemplate>, 'close' | 'isShow'> & {
          options: ExtraOptions &
            Omit<
              Pick<ComponentPropsWithoutRef<typeof DefaultTemplate>['options'], 'delay' | 'duration' | 'status'>,
              keyof ExtraOptions
            >
        }
    >
    defaultOptions?: Partial<
      ComponentPropsWithoutRef<typeof DefaultTemplate>['options'] &
        ComponentPropsWithoutRef<typeof DefaultList>['options']
    >
  } = {}) {
    this.defaultOptions = {
      ...this.defaultOptions,
      ...defaultOptions,
    }

    if (typeof document !== 'undefined') {
      const portalElement = document.getElementById(portalId)

      if (portalElement) {
        this.portal = portalElement
      } else {
        const newPortal = document.createElement('div')
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
            List: List as ComponentPropsWithoutRef<typeof Context.Provider>['value']['List'],
            Template: Template as ComponentPropsWithoutRef<typeof Context.Provider>['value']['Template'],
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
    content: ComponentPropsWithoutRef<typeof DefaultTemplate>['content'],
    options?: ExtraOptions &
      (Partial<Omit<ComponentPropsWithoutRef<typeof DefaultTemplate>['options'], keyof ExtraOptions>> &
        Partial<Omit<ComponentPropsWithoutRef<typeof DefaultList>['options'], keyof ExtraOptions>>)
  ) {
    return this.createToast(content, { ...this.defaultOptions, ...options })
  }
}

export default Toast
