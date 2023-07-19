import { Timeline } from "antd"
import { BsCircle } from "react-icons/bs"
// import "antd/dist/reset.css"
import Events from "@/components/Event"
interface Props {
  data: any[]
}

function TrackingUpdates({ data }: Props) {
  return (
    <div className='bg-blue basis-[382px] rounded-[10px] py-[13px] pl-[25px] relative   min-h-[500px] '>
      <div>
        <h2 className=' text-white text-center font-semibold  '>
          TRACKING UPDATES
        </h2>
      </div>
      <div className='max-h-[550px]  timeline overflow-y-auto mt-5   '>
        <Timeline
          // pending={delivered ? false : "Delivery"}
          reverse={true}
          pendingDot={<BsCircle size={40} className='fill-white' />}
          className='mb-[40px] relative'
          mode={"left"}
        >
          <div className='h-fit' style={{ padding: 20 }}>
            <div
            // className={`
            // border-solid h-[calc(100%_-_120px)]
            // // ${
            //   // delivered
            //     // ? "border-solid h-[calc(100%_-_120px)]"
            //     // : "border-dashed h-[calc(100%_-_40px)]"
            // // }
            // absolute top-[20px] bottom-[00px] left-[4px]  border-white border-l-[3px]`}
            >
              {data?.map((item: any, index: any) => (
                <Events key={index} {...item} />
              ))}
            </div>
          </div>
        </Timeline>
      </div>
    </div>
  )
}

export default TrackingUpdates
