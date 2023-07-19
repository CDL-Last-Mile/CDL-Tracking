/**
 * Calculates the distance between two positions and creates an alert if greater than one mile
 *
 * @param lat1 Latitude of position 1
 * @param long1 Longitude of position 1
 * @param lat2 Latitude of position 2
 * @param long2 Longitude of position 2
 **/
export function calculateMiles(
  lat1: number,
  long1: number,
  lat2: number,
  long2: number
): void {
  let dLat = (lat2 - lat1) * (Math.PI / 180)
  let dLon = (long2 - long1) * (Math.PI / 180)

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  // Distance in miles
  let distance = (3958.75 * c) / 1.60934

  if (distance < 1) {
    alert("Driver Nearby!")
  }
}

export function isDateMoreThan3Days(dateString:string){
  const date = new Date(dateString);
  const currentDate = new Date(); 
  const diffInMs = currentDate.getTime() - date.getTime(); 
  const diffInDays = Math.floor(diffInMs/(1000*60*60*24)); 
  return diffInDays > 3;
}

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180)
}


export const calculateZoom = (distance: number) => {
  console.log("distance is: ", distance)
  if (distance <= 1) {
    return 14;
  } else if (distance <= 5) {
    return 14;
  } else if (distance <= 10) {
    return 12;
  } else if (distance <= 25) {
    return 12;
  } else if (distance <= 50) {
    return 10;
  } else if (distance <= 100) {
    return 10;
  } else if (distance <= 250) {
    return 8;
  } else if (distance <= 500) {
    return 6;
  } else if (distance <= 1000) {
    return 4;
  } else {
    return 3;
  }
}


export const handleClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  setState: React.Dispatch<React.SetStateAction<any>>
): void => {
  document.addEventListener("mousedown", (e: MouseEvent) => {
    const target = e.target
    if (ref.current && !ref.current.contains(target as Node) ) {
      setState(false)
    }
  })
}
