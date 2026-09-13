import type TGetUserResponse from "@/models/contracts/user/get-user-response";

type TGetCallsListItem = {
  guid: string;
  type: string;
  status: string;
  shortDescription: string;
  description: string;
  address: string;
  calledAt: string;
  establishment: string;
  author: TGetUserResponse;
};

type TGetCallsListResponse = TGetCallsListItem[];

export default TGetCallsListResponse;
