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

interface DeliveryOptionInterface {
  orderTrackingId: string | string[] | undefined
  instruction: string
}

function DeliveryInstruction({ setState, state }: Props) {
  const router = useRouter()
  const { trackID } = router.query

  // const base = "test.cdldelivers.com"
  const element: RefObject<HTMLDivElement> = useRef(null)

  const [formData, setFormData] = useState<DeliveryOptionInterface>({
    orderTrackingId: trackID,
    instruction: "",
  })
 
  const postData = async (body: DeliveryOptionInterface) => {
    const alert = toast.loading("Updating Your Delivery Instruction!")
    try {
      const response = await fetchWrapper.put(
        `https://${process.env.baseURL}/deliveryinstruction`,
        body
      )
      toast.update(alert, {
        render: "Delivery Instruction Set",
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

  const deliveryMutation = useMutation((data: DeliveryOptionInterface) =>
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
            Delivery Instruction
          </h2>
        </div>

        <form
          action=''
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className='flex flex-col gap-1'>
            <div className='bg-bg-form flex  flex-col  justify-between gap-[30px] px-[72px] py-[28px]'>
              <p className='capitalize '>Delivery Instructions: </p>
              <span>
                <textarea
                  title='notification-email'
                  maxLength={100}
                  name=''
                  id=''
                  className='w-full h-[100px] border border-[#1C5894] rounded-[6px] p-2   '
                  value={formData.instruction}
                  onChange={(e) =>
                    setFormData((old) => ({
                      ...old,
                      instruction: e.target.value,
                    }))
                  }
                />
              </span>
            </div>
          </div>
          <div className='py-[23px] flex items-center justify-center bg-bg-form  rounded-bl-[10px] rounded-br-[10px]   '>
            <button
              className='bg-blue  text-white py-3 px-[50px] rounded-[6px]'
              onClick={() => deliveryMutation.mutate(formData)}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DeliveryInstruction
