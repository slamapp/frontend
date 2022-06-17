export const textureType = {
  RUBBER: "고무",
  URETHANE: "우레탄",
  ASPHALT: "아스팔트",
  SOIL: "흙",
  CONCRETE: "콘크리트",
  ETC: "기타",
} as const

type Texture = typeof textureType
export type TextureValue = Texture[keyof Texture]
export type TextureKey = keyof Texture
