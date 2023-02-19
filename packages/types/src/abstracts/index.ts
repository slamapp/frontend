import type { APIUser } from '../objects/user'

export interface Id {
  id: string
}

export interface Default extends Id {
  createdAt: string
  updatedAt: string
}

export interface Send extends Default {
  sender: Pick<APIUser, 'id' | 'nickname' | 'profileImage'>
}

export interface Receive extends Default {
  receiver: Pick<APIUser, 'id' | 'nickname' | 'profileImage'>
}

export interface Create extends Default {
  creator: Pick<APIUser, 'id' | 'nickname' | 'profileImage'>
}

export type OmitAt<T> = Omit<T, 'createdAt' | 'updatedAt'>

export interface List<T> {
  contents: T[]
}

export interface CursorList<T extends Id> extends List<T> {
  lastId: T['id'] | null
}

export type CursorListRequestOption<T extends Id> =
  | { isFirst: true; lastId: null; size?: number }
  | { isFirst: false; lastId: T['id']; size?: number }
