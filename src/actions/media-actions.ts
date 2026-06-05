import blagocityApi from "@/api/blagocity-api";
import type TGetMediaResponse from "@/models/contracts/media/get-media-response";
import { File, UploadType } from "expo-file-system";
import TCreateMediaResponse from "@/models/contracts/media/create-media-response";

export const createMedia = async (token: string, uri: string) => {
  const file = new File(uri);
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    httpMethod: "POST" as const,
    uploadType: UploadType.MULTIPART,
    fieldName: "files",
    onProgress: ({ bytesSent, totalBytes }: { bytesSent: number; totalBytes: number }) => {
      const percentage = (bytesSent / totalBytes) * 100;
    },
  };
  const uploadTask = file.createUploadTask("https://blagocity.ru/api/media", options);
  const result = await uploadTask.uploadAsync();
  console.log(result?.body);

  return JSON.parse(result?.body) as TCreateMediaResponse;
};

export const getMedia = async (guid: string) => {
  return await blagocityApi().get<TGetMediaResponse>(`/media/${guid}`).json();
};
