import Link from 'next/link';

export const Error = () => {
  return (
    <div className="flex items-center justify-center text-center flex-col gap-12 h-screen">
        <h2 className="text-black font-bold text-[36px] ">
          Unable To Find Tracking Details
        </h2>
        {/* <Link href={'/'} className="text-blue underline ">
          {' '}
          Go Back
        </Link> */}
        <Link href={'/'} className="text-blue underline ">
        <button className=" bg-blue py-[10px] px-[36px] text-white ">
          Go Back
        </button>
      </Link>
      </div>
  )
}
