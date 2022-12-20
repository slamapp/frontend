import { useEffect } from "react"
import * as Sentry from "@sentry/nextjs"

interface Options {
  dsn: string
  allowUrls: string[]
}

const useSentry = ({ dsn, allowUrls }: Options) => {
  useEffect(() => {
    Sentry.init({
      dsn,
      enabled: process.env.STAGE === "production",
      allowUrls,
    })
  }, [allowUrls, dsn])
}

export default useSentry
