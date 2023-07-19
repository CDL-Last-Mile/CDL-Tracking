import Head from "next/head"
import { fetchWrapper } from "@/utils"

import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"

import { Loading } from "@/components/Loading"
import { Error } from "@/components/Error"
import ProgressBar from "@/components/ProgressBar"
import TrackingInfo from "@/components/TrackingInfo"
import TrackingUpdates from "@/components/TrackingUpdates"
import { TrackingMap } from "@/components/Map"
import { useEffect } from "react"
import { calculateMiles, isDateMoreThan3Days } from "@/helper"

export default function Track() {
  const router = useRouter()
  const { trackID } = router.query
  const fetchData = async (id: any) => {
    const response = await fetchWrapper.get(
      `https://${process.env.baseURL}/Tracking?orderTrackingId=${id}`
    )

    const data = await response.json()
    return data
  }

  const { data, isError, error, isLoading } = useQuery(
    ["trackData", trackID],
    () => fetchData(trackID),
    {
      staleTime: 2000,
      keepPreviousData: true,
    }
  )

  if (error || data == "Failed") {
    return <Error />
  }


  return (
    <>
      <Head>
        <title>CDL-Tracking</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex flex-col gap-4 '>
        {isLoading && <Loading />}

        <ProgressBar latestUpdate={data?.trackingInformation?.latestUpdate} />

        <TrackingInfo {...data?.trackingInformation} />

        <div className='   lg:w-[1216px] lg:mx-auto shadow-md flex flex-col lg:flex-row justify-between gap-8 '>
          <div className='flex-1'>
            {data?.trackingEvents && (
              <TrackingUpdates data={data?.trackingEvents} />
            )}
          </div>

          {
            !data?.trackingInformation?.isAgent && 
            <div className=' basis-[700px] rounded-[10px]'>
            {(data?.trackingInformation?.latestUpdate ==
              "Driver en-route to delivery" ||
              data?.trackingInformation?.latestUpdate ==
                "Package Scanned At Delivery") && (
              <TrackingMap
                deliveryLat={data?.trackingInformation.deliveryLocationLat}
                deliveryLong={data?.trackingInformation.deliveryLocationLong}
                driverLat={data?.mapInfo?.driverLat || 41.59521484375}
                driverLong={data?.mapInfo?.driverLon || -72.18270874023438}
                delivered={false}
              />
            )}
            {data?.trackingInformation?.latestUpdate == "Delivery complete" && !isDateMoreThan3Days(data?.trackingInformation?.deliveryDate) &&(
              <TrackingMap
                deliveryLat={data?.trackingInformation.deliveryLocationLat}
                deliveryLong={data?.trackingInformation.deliveryLocationLong}
                driverLat={data?.mapInfo?.driverLat || data?.trackingInformation.deliveryLocationLat}
                driverLong={data?.mapInfo?.driverLon || data?.trackingInformation.deliveryLocationLong}
                delivered={true}
              />
            )}
          </div>
          }
        </div>
      </main>
    </>
  )
}