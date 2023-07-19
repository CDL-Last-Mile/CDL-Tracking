import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import NotificationSetting from "./NotificationSetting"
import { useRouter } from "next/router"
import DeliveryInstruction from "./DeliveryInstruction"

function Header() {
  const router = useRouter()

  const [openNotificationSettings, setOpenNotificationSettings] =
    useState<boolean>(false)
  const [openDeliverySettings, setOpenDeliverySettings] =
    useState<boolean>(false)

  return (
    <header className='cdl-bg-blue lg:min-w-[1216px] py-[20px] px-5 '>
      <div className=' max-w-[1100px] mx-auto flex items-center justify-between relative  '>
        <div className='flex'>
        <Image
            src={`${process.env.iisPath}/logo.png`}
            alt=''
            width={150}
            height={100}
          />
        </div>
        <div
          className='bg-white w-[32px] h-[32px]  '
          style={{ visibility: "hidden" }}
        ></div>

        <div className=' flex items-center gap-6  '>
          {router.pathname.includes("/track/") && (
            <div
              onClick={() =>
                setOpenNotificationSettings(!openNotificationSettings)
              }
            >
              <Image
                src={`${process.env.iisPath}/icons/bell-icon.svg`}
                alt='notification'
                width={24}
                height={24}
              />
            </div>
          )}
          {router.pathname.includes("/track/") && (
            <div onClick={() => setOpenDeliverySettings(!openDeliverySettings)}>
              <Image
                src={`${process.env.iisPath}/icons/edit-icon.svg`}
                alt='notification'
                width={24}
                height={24}
              />
            </div>
          )}
          <Link href={"/"} className='text-blue underline '>
            <button className=' cdl-bg-red py-[10px] px-[36px] text-white '>
              Home
            </button>
          </Link>
        </div>
        {openNotificationSettings && router.pathname.includes("/track/") && (
          <div className=' absolute top-[50px] right-[150px] translate-x-[50%] z-[10000000] '>
            <NotificationSetting
              setState={setOpenNotificationSettings}
              state={openNotificationSettings}
            />
          </div>
        )}
        {openDeliverySettings && router.pathname.includes("/track/") && (
          <div className=' absolute top-[50px] right-[150px] translate-x-[50%] z-[10000000] '>
            <DeliveryInstruction
              setState={setOpenDeliverySettings}
              state={openDeliverySettings}
            />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
