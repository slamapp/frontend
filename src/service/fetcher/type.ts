export const requestTypes = {
  DEFAULT: "DEFAULT",
  AUTH: "AUTH",
  AUTH_FILE: "AUTH_FILE",
} as const;

export type RequestType = typeof requestTypes;
export type RequestTypeUnion = RequestType[keyof RequestType];
