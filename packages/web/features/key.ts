import courts from "./courts/key"
import favorites from "./favorites/key"
import follows from "./follows/key"
import notifications from "./notifications/key"
import reservations from "./reservations/key"
import users from "./users/key"

const key = {
  courts,
  favorites,
  follows,
  notifications,
  reservations,
  users,
} as const

export default key
