import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { calculateZoom, calculateDistance } from "@/helper"

// import { useAppSelector } from "@/store/hooks"

const libraries = ['places'];

const mapCointainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
  borderColor: '#1C5894',
  borderWidth: '2px',
};
const mapStyles = 'rounded-xl w-2/3';

export const TrackingMap = ({
  deliveryLat,
  deliveryLong,
  driverLat,
  driverLong,
  delivered
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
 
  const coords = [
    {
      lat: deliveryLat,
      lng: deliveryLong,
      icon: `${process.env.iisPath}/icons/package.png`,
      id: 1,
      idx: 'delivery',
    },
    {
      lat: driverLat,
      lng: driverLong,
      icon: `${process.env.iisPath}/icons/van.png`,
      id: 2,
      idx: 'driver',
    },
  ];

  // const center = {
  //   lat: delivered ? deliveryLat : driverLat || 0,
  //   lng: delivered ? deliveryLong : driverLong || 0,
  // };

  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState({ lat: delivered? deliveryLat : driverLat || 0, lng: delivered ? deliveryLong : driverLong || 0 });

  useEffect(() => {
    const distance = calculateDistance(driverLat, driverLong, deliveryLat, deliveryLong);
    const newZoom = calculateZoom(distance);
    setZoom(newZoom);
    setCenter({ lat: driverLat, lng: driverLong });
    if(!delivered){
      const midpointLat = (driverLat + deliveryLat) / 2;
      const midpointLng = (driverLong + deliveryLong) / 2;
      setCenter({ lat: midpointLat, lng: midpointLng });
    }
  }, [driverLat, driverLong, deliveryLat, deliveryLong, delivered]);


  

  if (loadError)
    return (
      <div className="flex items-center justify-center">
        <h2 className="max-w-2xl mx-auto text-[calc(1vw_+_1rem)] lg:text-2xl text-center text-gray-400 inter-b">
          Error loading Maps
        </h2>
      </div>
    );

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center">
        <h2 className="max-w-2xl mx-auto text-[calc(1vw_+_1rem)] lg:text-2xl text-center text-gray-400 inter-b">
          Loading Maps
        </h2>
      </div>
    );

  return (
    <GoogleMap
      mapContainerStyle={mapCointainerStyle}
      zoom={zoom}
      center={center}
      options={{ styles: mapStyles }}
    >
      {isLoaded && !delivered
        ? coords.map(
            (marker) =>
              marker.lat &&
              marker.lng && (
                <MarkerF
                  title={'location'}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  icon={marker.icon}
                  // shape={{ coords }}
                  key={marker.id}
                />
              )
          )
        : coords.slice(0,1).map(
          (marker) =>
            marker.lat &&
            marker.lng && (
              <MarkerF
                title={'location'}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={marker.icon}
                // shape={{ coords }}
                key={marker.id}
              />
            )
        )}
    </GoogleMap>
  );
};
