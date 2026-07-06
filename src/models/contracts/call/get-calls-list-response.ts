type TGetCallsListItem = {
  guid: string;
  type: string;
  status: string;
  shortDescription: string;
  description: string;
  address: string;
  calledAt: string;
  establishment: string;
  author: string;
};

type TGetCallsListResponse = TGetCallsListItem[];

export default TGetCallsListResponse;
