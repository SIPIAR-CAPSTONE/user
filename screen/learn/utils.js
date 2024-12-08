import * as Location from "expo-location";

export async function reverseGeocode({ longitude, latitude }) {
  const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
    latitude: latitude,
    longitude: longitude,
  });
  return reverseGeocodedAddress;
}
