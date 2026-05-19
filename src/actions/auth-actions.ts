import blagocityApi from "@/api/blagocity-api";
import TSignIResponse from "@/models/contracts/auth/signIn-response";
import TSignInRequest from "@/models/contracts/auth/signIn-request";

export const signIn = async (request: TSignInRequest) => {
  return await blagocityApi()
    .post<TSignIResponse>("/auth/login", {
      json: request,
    })
    .json();
};

export const refreshToken = async (token: string) => {
  return await blagocityApi(token).post("/token/refresh").json();
};
