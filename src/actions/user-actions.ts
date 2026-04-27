import blagocityApi from "@/api/blagocity-api";
import TCreateUserResponse from "@/models/contracts/user/createUserResponse";
import TCreateUserRequest from "@/models/contracts/user/createUserRequest";

export const getMe = async () => {
  return await blagocityApi.get("/me").json();
};

export const createUser = async (request: TCreateUserRequest) => {
  return await blagocityApi
    .post<TCreateUserResponse>("/users", {
      json: request,
    })
    .json();
};

export const editUser = async (guid: string) => {
  return await blagocityApi.patch(`/users/${guid}`).json();
};

export const getUser = async (guid: string) => {
  return await blagocityApi.get(`/users/${guid}`).json();
};
