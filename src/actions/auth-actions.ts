import blagocityApi from "@/api/blagocity-api";
import TSignIResponse from "@/models/contracts/auth/signInResponse";
import TSignInRequest from "@/models/contracts/auth/signInRequest";

export const signIn = async (request: TSignInRequest) => {
  return await blagocityApi
    .post<TSignIResponse>("/auth/login", {
      json: request,
    })
    .json();
};

export const refreshToken = async () => {
  return await blagocityApi.post("/token/refresh").json();
};
