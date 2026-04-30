import blagocityApi from "@/api/blagocity-api";
import TCreateUserResponse from "@/models/contracts/user/createUserResponse";
import TCreateUserRequest from "@/models/contracts/user/createUserRequest";
import TGetUserResponse from "@/models/contracts/user/getUserResponse";

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

export const editUser = async (token: string, guid: string) => {
  return await blagocityApi(token).patch(`/users/${guid}`).json();
};

export const getUser = async (token: string, guid: string) => {
  return await blagocityApi(token).get<TGetUserResponse>(`/users/${guid}`).json();
};
