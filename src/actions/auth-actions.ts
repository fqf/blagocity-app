import blagocityApi from "@/api/blagocity-api";

export const signUp = async () => {
  return await blagocityApi.post("/auth/login").json();
};

export const signIn = async () => {
  return await blagocityApi.post("/auth/login").json();
};

export const refreshToken = async () => {
  return await blagocityApi.post("/token/refresh").json();
};
