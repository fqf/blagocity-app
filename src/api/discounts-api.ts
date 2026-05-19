import ky from "ky";

const api = ky.create({
  prefix: process.env.EXPO_PUBLIC_DISCOUNTS_API_URL,
  timeout: false,
});
const discountsApi = (token?: string) => (token ? api.extend({ headers: { Authorization: `Bearer ${token}` } }) : api);

export default discountsApi;
