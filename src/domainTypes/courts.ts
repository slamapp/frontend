export const textures = {
  RUBBER: "고무",
  URETHANE: "우레탄",
  ASPHALT: "아스팔트",
  SOIL: "흙",
  CONCRETE: "콘크리트",
  ETC: "기타",
} as const

type Texture = typeof textures
export type TextureValueUnion = Texture[keyof Texture]
export type TextureKeyUnion = keyof Texture
