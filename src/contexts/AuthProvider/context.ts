import { APINotification } from "@domainTypes/tobe/notification";
import { APIUser } from "@domainTypes/tobe/user";
import { createContext } from "react";
import { DataProps } from "./reducer";

export interface ContextProps {
  authProps: DataProps;
  setCurrentUser: (data: any) => void;
  getCurrentUser: () => Promise<void>;
  logout: () => void;
  updateMyProfile: (
    editedUserProfile: Pick<
      APIUser,
      "nickname" | "description" | "proficiency" | "positions"
    >
  ) => Promise<void>;
  updateMyProfileImage: (editedProfileImageFile: File) => Promise<void>;
  deleteMyProfileImage: () => Promise<void>;
  createFavorite: (courtId: number) => void;
  deleteFavorite: (favoriteId: number) => void;
  unshiftNotification: (notification: APINotification) => void;
  getMyFavorites: () => void;
  getMyReservations: () => void;
  readAllNotifications: () => void;
  getMoreNotifications: () => void;
  authProviderInit: () => void;
}

const Context = createContext<ContextProps>({} as ContextProps);

export default Context;
