import Head from "next/head"
import { fetchWrapper } from "@/utils"
import { useState } from "react"

import { useRouter } from "next/router"

export default function Home() {
  const [trackingID, setTrackingID] = useState<any>()
  const router = useRouter()

  const checkIfValid = async (trackingID: string) => {
    const response = await fetchWrapper.get(
      `https://${process.env.baseURL}/Tracking?orderTrackingId=${trackingID.replace(" ", "")}`
    )

    if (response.ok) {
      router.push(`/track/${trackingID}`)
      return true
    }
    alert("Unable To Find Tracking Details")
    return false
  }

  return (
    <>
      <Head>
        <title>CDL-Tracking</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className=' main-container bg-bg '>
        <div className=' bg-hero-pattern bg-cover   bg-no-repeat px-5 lg:px-[127px] lg:font-[700px] flex flex-col lg:flex-row py-12 '>
          <div className=' lg:flex-1'>
            <h1 className='text-white text-center lg:text-left text-[28px] lg:text-[40px] font-[700] leading-[48px]  '>
              Your tracking experience start with us.
            </h1>
            <p className='text-white text-center lg:text-left  text-[18px] font-[400px]'>
              Get the latest update on the delivery of your order.
            </p>
          </div>
          <div className=' hidden lg:block lg:flex-1'></div>
        </div>
        <div className='   bg-bg py-10  '>
          <form
            className=' flex items-center justify-center flex-col gap-8   '
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className='py-[22px] px-5 lg:px-[100px] cdl-bg-blue lg:w-[422px]'>
              <h2 className='  text-white text-center '>SHIPMENT TRACKING</h2>
            </div>
            <p className='text-center text-blue '>Enter your CDL Tracking ID</p>
            <input
              type='text'
              placeholder='Order Tracking ID '
              className='  lg:w-[635px] py-4 pl-10 rounded-[5px] '
              value={trackingID}
              onChange={(e) => setTrackingID(e.target.value)}
            />
            <div className='flex items-center justify-between gap-5 lg:w-[635px]'>
              <button
                className='cdl-bg-blue text-white py-3 px-[50px]  rounded-[6px] '
                onClick={() => {
                  // trackMutation.mutate(trackingID)
                  checkIfValid(trackingID)
                }}
              >
                Track
              </button>
              <p className=' text-[14px] text-blue '>
                <a href='mailto:support@cdldelivers.com'>Help?</a>
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
