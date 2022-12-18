import { useSuspenseQuery } from "@suspensive/react-query"
import key from "~/features/key"

export const useAddressQuery = (
  position: Parameters<typeof key.addresses.byPosition>[0]
) =>
  useSuspenseQuery(
    key.addresses.byPosition(position),
    () =>
      new Promise<string>((resolve) => {
        const latLng = new kakao.maps.LatLng(
          position.latitude,
          position.longitude
        )
        new kakao.maps.services.Geocoder().coord2RegionCode(
          latLng.getLng(),
          latLng.getLat(),
          (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              // 도로명 주소
              if (result[0]) {
                resolve(result[0].address_name)
              }
              // 법정 주소
              else if (result[1]) {
                resolve(result[1].address_name)
              }
            } else {
              resolve("주소가 존재하지 않습니다.")
            }
          }
        )
      })
  )
