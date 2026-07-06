import blagocityApi from "@/api/blagocity-api";
import type TCreateCallRequest from "@/models/contracts/call/create-call-request";
import type TGetCallsListResponse from "@/models/contracts/call/get-calls-list-response";

export const createCall = async (token: string, placeGuid: string, request: TCreateCallRequest) => {
  return await blagocityApi(token)
    .post(`/establishments/${placeGuid}/assistant-calls`, {
      json: request,
    })
    .json();
};

export const getCallsList = async (token: string) => {
  return await blagocityApi(token).get<TGetCallsListResponse>("/tasks").json();
};

export const setCallStatus = async (
  token: string,
  guid: string,
  status: "new" | "accepted" | "rejected" | "completed",
) => {
  return await blagocityApi(token)
    .post(`/tasks/${guid}/status`, {
      json: {
        status,
        reason: "",
      },
    })
    .json();
};

export const takeCall = async (token: string, callGuid: string) => {
  return await blagocityApi(token)
    .put(`/tasks/${callGuid}/recipients/me/status`, {
      headers: {
        "Content-Type": "application/json; charset=utf8",
      },
    })
    .json();
};
