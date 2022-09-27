type OmitAt<T> = Omit<T, "createdAt" | "updatedAt">

export default OmitAt
