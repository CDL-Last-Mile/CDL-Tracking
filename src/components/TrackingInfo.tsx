import React from "react";

interface Props {
  ordertrackingid: string;
  referenceNumber: string;
  destinationCity: string;
  destinationState: string;
  latestUpdate: string | null;
  driverName: string;
  exceptionDetails: string | null;
  podName: string | null;
  isException: boolean | false;
}

function TrackingInfo({
  ordertrackingid,
  referenceNumber,
  destinationCity,
  destinationState,
  latestUpdate,
  driverName,
  exceptionDetails,
  podName,
  isException
}: Props) {
  // const isException = latestUpdate?.toLowerCase().includes("exception");

  return (
    <div className="md:w-[650px] lg:w-[1216px] md:mx-auto flex flex-col md:flex-row justify-between shadow-md rounded-[10px] px-[22px] py-[13px]">
      <div className="flex flex-col gap-5">
        <h2 className="text-blue font-bold text-[24px]">Tracking Information</h2>
        <div className="flex flex-col gap-[10px]">
          <h3 className="font-medium">Tracking Number: {ordertrackingid}</h3>
          <h3 className="font-medium">Package Reference: {referenceNumber}</h3>
          {/* <h3 className="font-medium">Estimated delivery date:</h3> */}
          <h3 className="font-medium">
            Destination:
            {destinationCity != undefined ? `${destinationCity}, ${destinationState} ` : ""}
          </h3>
        </div>
      </div>
      <div className="md:text-right flex flex-col gap-5">
        {isException ? (
          <>
            <h2 className="text-blue font-bold text-[24px] cdl-text-red">
              Latest Update
            </h2>
            <h3 className={isException ? "font-semibold text-[20px] cdl-text-red" : "font-semibold text-[20px]"}>
              {latestUpdate}
            </h3>
            <p className={isException ? "font-medium cdl-text-red" : "font-medium"}>{exceptionDetails}</p>
          </>
        ) : (
          <>
            <h2 className="text-blue font-bold text-[24px]">Latest Update</h2>
            <p className={isException ? "font-semibold text-[20px] cdl-text-red" : "font-semibold text-[20px]"}>
              {latestUpdate == "Label has been created" ? "Label Created" : latestUpdate}
            </p>
            {podName != null && <p> {podName} </p>}
          </>
        )}

        {driverName && (
          <div>
            <h3 className="font-bold text-[20px]">Driver Information</h3>
            <p> {driverName}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackingInfo;
