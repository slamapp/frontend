import type { UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { key } from "~/features"

const useCourtQuery = (
  courtId: Parameters<typeof api.courts.getCourtDetail>[0],
  filter: Parameters<typeof api.courts.getCourtDetail>[1],
  options?: Pick<
    UseQueryOptions<
      Awaited<ReturnType<typeof api.courts.getCourtDetail>>["data"] & {
        address: string
      }
    >,
    "onSuccess" | "enabled"
  >
) =>
  useQuery(
    key.courts.oneFilter(courtId || "", filter),
    async () => {
      const { data } = await api.courts.getCourtDetail(courtId, filter)

      const address = await new Promise((resolve) => {
        const latLng = new kakao.maps.LatLng(data.latitude, data.longitude)
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

      return { ...data, address }
    },
    {
      ...options,
      enabled: !!kakao.maps.services?.Geocoder && courtId !== "not enabled",
    }
  )

export default useCourtQuery
