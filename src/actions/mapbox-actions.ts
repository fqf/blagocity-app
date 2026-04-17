import mapboxGeocodeApi from "@/api/mapbox-geocode-api";

export const getAddressByCoords = (longitude: number, latitude: number) => {
  return mapboxGeocodeApi.get(
    `/reverse?access_token=pk.eyJ1IjoiZnFmMTE3IiwiYSI6ImNtbmpma3NobTBpdG4ycXM0bmdsbTNzMDYifQ.ywHGgGA43ijPcGAl7jwtfw&longitude=${longitude}&latitude=${latitude}&language=ru`,
  );
};
