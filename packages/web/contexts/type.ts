export interface ActionWithPayload<Type, Payload = unknown>
  extends ActionWithoutPayload<Type> {
  payload: Payload
}

export interface ActionWithoutPayload<Type> {
  type: Type
}
