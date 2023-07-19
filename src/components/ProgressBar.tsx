import { stat } from "fs"
import Image from "next/image"
import React from "react"

interface Props {
  latestUpdate: string
}

function ProgressBar({ latestUpdate }: Props) {
  let status = 0
  switch (latestUpdate) {
    case "Delivery complete":
      status = 5
      break
    case "Package Scanned At Delivery":
      status = 4
      break
    case "Driver en-route to delivery":
      status = 3
      break
    case "CDL Transfer Scan":
      status = 2
      break
    case "CDL Origin Scan":
      status = 2
      break
    case "Label has been created":
      status = 1
      break
    default:
      status = 0
  }

  return (
    <div className='flex flex-col items-center md:flex-row gap-5 justify-between  md:w-[650px]  lg:w-[1216px] md:mx-auto   shadow-md px-[22px] py-3  rounded-[10px] mt-[18px]  '>
      <div className=' progress-items '>
        {status > 0 ? (
          <Image
            src={`${process.env.iisPath}/icons/label_complete.svg`}
            alt=''
            width={42}
            height={42}
          />
        ) : (
          <Image
            src={`${process.env.iisPath}/icons/label.svg`}
            alt=''
            width={42}
            height={42}
          />
        )}
        <span>LABEL CREATED</span>
      </div>

      <div className=' progress-items '>
        {status > 1 ? (
          <Image
            src={`${process.env.iisPath}/icons/processing_complete.svg`}
            alt=''
            width={42}
            height={42}
          />
        ) : (
          <Image
            src={`${process.env.iisPath}/icons/processing.svg`}
            alt=''
            width={42}
            height={42}
          />
        )}
        <span>PROCESSING</span>
      </div>
      <div className=' progress-items '>
        {status > 2 ? (
          <Image
            src={`${process.env.iisPath}/icons/out_complete.svg`}
            alt=''
            width={42}
            height={42}
          />
        ) : (
          <Image
            src={`${process.env.iisPath}/icons/out.svg`}
            alt=''
            width={42}
            height={42}
          />
        )}
        <span>OUT FOR DELIVERY</span>
      </div>
      <div className=' progress-items '>
        {status > 4 ? (
          <Image
            src={`${process.env.iisPath}/icons/delivered_complete.svg`}
            alt=''
            width={42}
            height={42}
          />
        ) : (
          <Image
            src={`${process.env.iisPath}/icons/delivered.svg`}
            alt=''
            width={42}
            height={42}
          />
        )}
        <span>DELIVERED</span>
      </div>
    </div>
  )
}

export default ProgressBar
