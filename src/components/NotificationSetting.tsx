import { handleClickOutside } from "@/helper"
import { fetchWrapper } from "@/utils"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import { useRouter } from "next/router"
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { toast } from "react-toastify"

interface Props {
  setState: React.Dispatch<React.SetStateAction<any>>
  state: boolean
}

interface NotificationDatainterface {
  orderTrackingId: string | string[] | undefined
  email: string
  phone: string
  onPod: 0 | 1
  nextStopDelivery: 0 | 1
}

function NotificationSetting({ setState, state }: Props) {
  const router = useRouter()
  const { trackID } = router.query

  console.log(trackID)
  // const base = "test.cdldelivers.com"
  const element: RefObject<HTMLDivElement> = useRef(null)

  const [formData, setFormData] = useState<NotificationDatainterface>({
    orderTrackingId: trackID,
    email: "",
    phone: "",
    onPod: 0,
    nextStopDelivery: 0,
  })

  const postData = async (body: NotificationDatainterface) => {
    const alert = toast.loading("Updating Your Delivery Notification Setting!")
    try {
      const response = await fetchWrapper.put(
        `https://${process.env.baseURL}/notification`,
        body
      )
      toast.update(alert, {
        render: "Delivery Notification Set",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
      setState(false)
    } catch (error) {
      toast.update(alert, {
        render: `Something went wrong : ${error}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
    }
  }

  const notificationMutation = useMutation((data: NotificationDatainterface) =>
    postData(data)
  )
  //   useCallback(() => {
  //     handleClickOutside(element, setState, state)
  //   }, [state, setState])

  useEffect(() => {
    handleClickOutside(element, setState)
  }, [])

  return (
    <div className=' flex items-center justify-center py-10  ' ref={element}>
      <div className='w-[592px] rounded-[10px]  bg-white '>
        <div className=' bg-blue py-[28px] rounded-tl-[10px] rounded-tr-[10px]  '>
          <h2 className=' text-white text-center font-[600px] text-[16px]'>
            NOTIFICATIONS
          </h2>
        </div>
        <div>
          <div className=' py-[28px] px-[72px] '>
            <p>
              You can select how and when we should contact you with updates on
              your shipment.
            </p>
          </div>
        </div>
        <form
          action=''
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className='flex flex-col gap-1'>
            <div className='bg-bg-form flex items-center justify-between px-[72px] py-[28px]'>
              <p className='capitalize '>Package Delivered Notification </p>
              <span
                onClick={() =>
                  setFormData((old) => {
                    if (formData.onPod === 0) {
                      return { ...old, onPod: 1 }
                    } else {
                      return { ...old, onPod: 0 }
                    }
                  })
                }
              >
                <Image
                  src={
                    formData.onPod === 1
                      ? `${process.env.iisPath}/icons/on=on.svg`
                      : `${process.env.iisPath}/icons/on=off.svg`
                  }
                  alt=''
                  width={46}
                  height={24}
                />
              </span>
            </div>
            <div className='bg-bg-form flex items-center justify-between px-[72px] py-[28px]'>
              <p className='capitalize '>Package In Transit Notification </p>
              <span
                onClick={() =>
                  setFormData((old) => {
                    if (formData.nextStopDelivery === 0) {
                      return { ...old, nextStopDelivery: 1 }
                    } else {
                      return { ...old, nextStopDelivery: 0 }
                    }
                  })
                }
              >
                <Image
                  src={
                    formData.nextStopDelivery === 1
                      ? `${process.env.iisPath}/icons/on=on.svg`
                      : `${process.env.iisPath}/icons/on=off.svg`
                  }
                  alt=''
                  width={46}
                  height={24}
                />
              </span>
            </div>
            <div className='bg-bg-form flex items-center justify-between gap-[30px] px-[72px] py-[28px]'>
              <p className='capitalize '>Notification E-mail: </p>
              <span>
                <input
                  title='notification-email'
                  type='text'
                  name=''
                  id=''
                  className='w-full h-[34px] border border-[#1C5894] rounded-[6px] px-2  '
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((old) => ({ ...old, email: e.target.value }))
                  }
                />
              </span>
            </div>

            <div className='bg-bg-form flex items-center justify-between gap-[30px] px-[72px] py-[28px]'>
              <p className='capitalize '>Notification SMS: </p>
              <span>
                <input
                  title='notification-sms'
                  type='text'
                  name=''
                  id=''
                  className=' w-full h-[34px] border border-[#1C5894] rounded-[6px] px-2 '
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((old) => ({ ...old, phone: e.target.value }))
                  }
                />
              </span>
            </div>
          </div>
          <div className='py-[23px] flex items-center justify-center  '>
            <button
              className='bg-blue  text-white py-3 px-[50px] rounded-[6px]'
              onClick={() => notificationMutation.mutate(formData)}
            >
              Get Notified!
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NotificationSetting
