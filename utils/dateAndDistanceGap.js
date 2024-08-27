const getTimeGap = (timestamp) => {
  const dateObj = new Date(timestamp); // Convert given string timestamp into date object
  const currentDate = new Date(); // Get current date

  // Calculate the difference in milliseconds
  const differenceInMillis = Math.abs(currentDate - dateObj);

  // Constants for time units in milliseconds
  const oneMinute = 1000 * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneMonth = oneDay * 30; // Approximation of one month as 30 days

  // Calculate the difference in months, days, hours, and minutes
  const monthsDifference = Math.floor(differenceInMillis / oneMonth);
  const daysDifference = Math.floor((differenceInMillis % oneMonth) / oneDay);
  const hoursDifference = Math.floor((differenceInMillis % oneDay) / oneHour);
  const minutesDifference = Math.floor(
    (differenceInMillis % oneHour) / oneMinute
  );

  const getTimeGapStringFormat = (months, days, hours, minutes) => {
    // If time is more than a month
    if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    }
    // If time is more than a day
    else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
    // If time is more than an hour
    else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    // If time is only in minutes
    else {
      return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    }
  };

  const timeGap = getTimeGapStringFormat(
    monthsDifference,
    daysDifference,
    hoursDifference,
    minutesDifference
  );
  return timeGap;
}

/**
 *
 * Get the distance based on the coordinate location of user and the givenAlert
 *
 *
 */
const getDistanceGap = function (userCoordinate, alertCoordinate) {
  //if coordinates are empty, null, undefined, or {} empty object
  if (
    (Object.keys(userCoordinate).length === 0 &&
      userCoordinate.constructor === Object) ||
    !userCoordinate ||
    !alertCoordinate ||
    (Object.keys(alertCoordinate).length === 0 &&
      alertCoordinate.constructor === Object)
  ) {
    return " - ";
  }

  const R = 6371; // Radius of the Earth in kilometers
  const userLat = toRadians(userCoordinate.latitude);
  const userLon = toRadians(userCoordinate.longitude);
  const alertLat = toRadians(alertCoordinate.latitude);
  const alertLon = toRadians(alertCoordinate.longitude);

  const dLat = alertLat - userLat;
  const dLon = alertLon - userLon;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(userLat) *
      Math.cos(alertLat) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  //convert degrees to radians
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Function to format the distance into a human-readable string
  function formatDistance(distanceInKm) {
    if (distanceInKm >= 1) {
      return `${distanceInKm.toFixed(1)} km`;
    } else {
      const distanceInMeters = distanceInKm * 1000;
      return `${distanceInMeters.toFixed(0)} m`;
    }
  }

  const distance = R * c; // Distance in kilometers
  return formatDistance(distance);
};

export { getTimeGap, getDistanceGap };
