export const DEFAULT_PROFILE_IMAGE_URL = "/assets/default_profile.svg"

export const env = {
  IS_PRODUCTION_MODE: process.env.NODE_ENV === "production",

  SLAM_TOKEN_KEY: process.env.NEXT_PUBLIC_SLAM_TOKEN_KEY as string,

  JWT_SECRET_KEY: process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string,

  SERVICE_API_END_POINT: process.env
    .NEXT_PUBLIC_SERVICE_API_END_POINT as string,

  SERVICE_API_SUB_FIX: process.env.NEXT_PUBLIC_SERVICE_API_SUB_FIX as string,

  GOOGLE_ANALYTICS_TRACKING_ID: process.env
    .NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID as string,

  KAKAO_JAVASCRIPT_KEY: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY as string,

  REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI as string,

  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN as string,
} as const
