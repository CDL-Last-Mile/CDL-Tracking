import { PulseLoader } from "react-spinners"

export const Loading = () => {
  return (
    <div className=' z-[10000]  absolute top-0 left-0 right-0 bottom-[-300px] bg-bg flex items-center justify-center '>
      {" "}
      <PulseLoader size={12} margin={2} color={"#123abc"} loading={true} />
    </div>
  )
}
