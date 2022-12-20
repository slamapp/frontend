import type { FunctionComponent, ReactNode } from "react"

interface Toast {
  isShow: boolean
  options: {
    duration: number
    delay: number
    status: "success" | "warning" | "error" | "info" | null
  }
  close: () => void
  closeAll: () => void
}

const DefaultTemplate: FunctionComponent<
  {
    content: FunctionComponent<Toast> | ReactNode
  } & Toast
> = ({ content: Content, isShow, options, close, closeAll }) => (
  <div
    style={{
      position: "relative",
      display: "flex",
      maxWidth: 450,
      margin: "0 16px 16px 16px",
      height: 70,
      padding: "0 20px",
      alignItems: "center",
      borderRadius: 4,
      backgroundColor: "white",
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      opacity: isShow ? 1 : 0,
    }}
  >
    {typeof Content === "function" ? (
      <Content
        isShow={isShow}
        close={close}
        closeAll={closeAll}
        options={options}
      />
    ) : (
      Content
    )}
  </div>
)

export default DefaultTemplate
