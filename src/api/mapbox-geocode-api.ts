import ky from "ky";

const mapboxGeocodeApi = ky.create({
  prefix: process.env.EXPO_PUBLIC_MAPBOX_GEOCODE_API_URL,
  timeout: false,
});

export default mapboxGeocodeApi;
