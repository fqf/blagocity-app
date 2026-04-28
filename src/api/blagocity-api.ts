import ky from "ky";

const api = ky.create({
  prefix: process.env.EXPO_PUBLIC_BLAGOCITY_API_URL,
  timeout: false,
});
const blagocityApi = (token?: string) => (token ? api.extend({ headers: { Authorization: `Bearer ${token}` } }) : api);

export default blagocityApi;
