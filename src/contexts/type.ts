export interface Action<T = string, P = undefined> {
  type: T;
  payload?: P;
}
