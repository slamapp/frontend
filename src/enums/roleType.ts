export const roleType = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

type RoleMap = typeof roleType;
export type Role = RoleMap[keyof RoleMap];
