import type { UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { queryKey } from "~/features/queryKey"

const useCourtQuery = (
  courtId: Parameters<typeof api.courts.getCourtDetail>[0],
  filter: Parameters<typeof api.courts.getCourtDetail>[1],
  options?: UseQueryOptions<
    { address: string } & Awaited<
      ReturnType<typeof api.courts.getCourtDetail>
    >["data"]
  >
) => {
  return useQuery<
    { address: string } & Awaited<
      ReturnType<typeof api.courts.getCourtDetail>
    >["data"]
  >(
    queryKey.courts.one(courtId),
    async () => {
      const { data } = await api.courts.getCourtDetail(courtId, filter)

      const latLng = new kakao.maps.LatLng(
        data.court.latitude,
        data.court.longitude
      )

      const address: string = await new Promise((resolve) => {
        searchAddrFromCoords(latLng, (result, status) => {
          console.log(result, status)

          if (status === kakao.maps.services.Status.OK) {
            // 도로명 주소
            if (result[0]) {
              resolve(result[0].address_name)
            }
            // 법정 주소
            else if (result[1]) {
              resolve(result[1].address_name)
            }
            // 주소가 없는 경우
            else {
              resolve("주소가 존재하지 않습니다.")
            }
          }
        })
      })

      return { ...data, address }
    },
    options
  )
}
export default useCourtQuery

function searchAddrFromCoords(
  coords: kakao.maps.LatLng,
  callback: (
    result: kakao.maps.services.RegionCode[],
    status: kakao.maps.services.Status
  ) => void
) {
  const geocoder = new kakao.maps.services.Geocoder()
  geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback)
}
