import ky from "ky";

const blagocityApi = ky.create({
  prefix: process.env.EXPO_PUBLIC_BLAGOCITY_API_URL,
  timeout: false,
});

export default blagocityApi;
