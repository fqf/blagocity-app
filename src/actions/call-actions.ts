import blagocityApi from "@/api/blagocity-api";

export const createCall = async (token: string, placeGuid: string) => {
  return await blagocityApi(token)
    .post(`/establishments/${placeGuid}/assistant-calls`, {
      json: {
        address: "",
        shortDescription: "Вызов помощника",
        description: "",
      },
    })
    .json();
};
