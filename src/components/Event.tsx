import { AiFillCheckCircle } from 'react-icons/ai';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { GiPlainCircle } from 'react-icons/gi';

import { FaCircle } from 'react-icons/fa';
import { Button, Timeline } from 'antd';
import Image from 'next/image';
import { useEffect, useRef } from 'react';


let deliveryError = 'text-red-700';

interface Props {
  trackingEvent: string | null;
  id: string | null;
  trackingEventTimestamp: string;
  vpod: string | null;
  eventCity: string;
  eventState: string;
}

const Events = ({
  trackingEvent,
  id,
  trackingEventTimestamp,
  vpod,
  eventCity,
  eventState,
}: Props) => {
  let fDate = new Date(trackingEventTimestamp).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const formatAMPM = (date: Date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12;
    const minute = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minute} ${ampm}`;
    return strTime;
  };

  let time = formatAMPM(new Date(trackingEventTimestamp));
  const firstItem = document.getElementsByClassName('first-item')


  // console.log(document.getElementsByClassName('first-item').removeC)

  return (
    <Timeline.Item
      key={id}
      className={`fill-green-update mt-[50px] ${trackingEvent == 'Label has been created'? 'first-item': ''} `}
      dot={
        trackingEvent === 'Business closed' ? (
          <HiOutlineExclamationCircle
            size={40}
            className={'fill-[#ff0000] mt-[-8px] mb-[-8px]'}
          />
        ) : trackingEvent === 'Delivery complete' ? (
          <GiPlainCircle
            size={40}
            className={'fill-[#fff] mt-[-8px] mb-[-8px] '}
          />
        ) : (
          <AiFillCheckCircle
            size={40}
            className={'bg-[#1C5894] mt-[-8px] mb-[-8px] '}
          />
        )
      }
    >
      <div className="flex gap-10 ">
        <div className="">
          <p className=" text-white  font-semibold ">{fDate}</p>
          <p className=" text-white  ">{time}</p>
        </div>
        <div className="flex flex-col">
          <p className=" text-white font-semibold ">
            {trackingEvent == 'Package Scanned At Delivery'
              ? 'Scanned At Delivery'
              : trackingEvent}
          </p>

          <p className=" text-white  ">{eventCity != "" ? `${eventCity}, ${eventState}`: ''}</p>
        </div>
        <div className="transition duration-300 ease-in-out deliveryImage hover:scale-[7.25] absolute top-[10px] right-[50px]  z-[1000]">
          {trackingEvent === 'Delivery complete' ? (
            vpod ?
            <Image
              unoptimized
              src={`data:image/jpeg;base64,${vpod}`}
              alt="delivered picture"
              width={20}
              height={10}
            /> : <></>
          ) : (
            ''
          )}
        </div>
      </div>
    </Timeline.Item>
  );
};

export default Events;
