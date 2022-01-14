import { User } from "./users";

export interface SenderObject extends CommonObject {
  sender: User;
}

export interface CommonObject {
  id: number;
  createdAt: ISOString;
  updatedAt: ISOString;
}

export type ISOString = string;
