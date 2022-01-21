import { PageType, PageTypeUnion } from "./actionTypes";

export interface Events {
  back: null | ((...args: any[]) => void | Promise<any>);
  customButton: CustomButton;
}

export type CustomButton = null | {
  title: string;
  handleClick: (...args: any[]) => void | Promise<any>;
};

export type GetPageType = (page: PageType) => PageTypeUnion;
