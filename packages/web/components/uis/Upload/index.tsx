import type {
  ChangeEvent,
  DragEvent,
  InputHTMLAttributes,
  ReactNode,
} from "react"
import { useEffect, useRef, useState } from "react"
import { css } from "@emotion/react"

interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "children"
  > {
  children?:
    | ((props: { file?: File; dragging: boolean }) => ReactNode)
    | ReactNode
  droppable?: boolean
  value?: File
  onChange?: (file: File) => void
}

const Upload = ({
  children,
  droppable = false,
  name,
  accept,
  value,
  onChange,
  className,
  ...props
}: Props) => {
  const [file, setFile] = useState(value)
  const [dragging, setDragging] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const changedFile = (e.target.files as FileList)[0]
    setFile(changedFile)
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    if (!droppable) {
      return
    }

    e.preventDefault() // 브라우저 기본 이벤트를 막는다.
    e.stopPropagation() // 부모나 자식 컴포넌트로 이벤트가 전파되는 것을 막는다.

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true)
    }
  }
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (!droppable) {
      return
    }

    e.preventDefault()
    e.stopPropagation()

    setDragging(false)
  }
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (!droppable) {
      return
    }

    e.preventDefault()
    e.stopPropagation()
  }
  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    if (!droppable) {
      return
    }

    e.preventDefault()
    e.stopPropagation()

    const changedFile = e.dataTransfer.files[0]
    setFile(changedFile)
    onChange?.(changedFile)
    setDragging(false)
  }

  useEffect(() => {
    if (file) {
      onChange?.(file)
    }
  }, [file])

  return (
    <div
      className={className}
      css={css`
        display: inline-block;
        cursor: pointer;
      `}
      onClick={() => ref.current?.click()}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      {...props}
    >
      <input
        css={css`
          display: none;
        `}
        ref={ref}
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
      />
      {typeof children === "function" ? children({ file, dragging }) : children}
    </div>
  )
}

export default Upload
