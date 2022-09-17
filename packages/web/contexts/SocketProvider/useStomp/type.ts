export type SendAuth = (destination: string, body: { [x: string]: any }) => void

export type UseStomp = (token: string) => {
  isConnected: boolean
  isLoading: boolean
  sendAuth: SendAuth
}
