import blagocityApi from "@/api/blagocity-api";
import TCreateUserResponse from "@/models/contracts/user/create-user-response";
import TCreateUserRequest from "@/models/contracts/user/create-user-request";
import TGetUserResponse from "@/models/contracts/user/get-user-response";

export const getMe = async (token: string) => {
  return await blagocityApi(token).get<TGetUserResponse>("/me").json();
};

export const createUser = async (request: TCreateUserRequest) => {
  return await blagocityApi()
    .post<TCreateUserResponse>("/users", {
      json: request,
    })
    .json();
};

export const getUser = async (token: string, guid: string) => {
  return await blagocityApi(token).get<TGetUserResponse>(`/users/${guid}`).json();
};
