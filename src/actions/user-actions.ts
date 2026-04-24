import blagocityApi from "@/api/blagocity-api";
import { TAvatarType } from "@/components/buttons/avatar-button";
import TCreateUserResponse from "@/models/contracts/user/createUserResponse";

export const getMe = async () => {
  return await blagocityApi.get("/me").json();
};

export const createUser = async (name: string, password: string, avatar: TAvatarType) => {
  return await blagocityApi
    .post<TCreateUserResponse>("/users", {
      json: {},
    })
    .json();
};

export const editUser = async (guid: string) => {
  return await blagocityApi.patch(`/users/${guid}`).json();
};

export const getUser = async (guid: string) => {
  return await blagocityApi.get(`/users/${guid}`).json();
};
