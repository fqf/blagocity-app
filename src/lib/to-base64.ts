import { File } from "expo-file-system";

const toBase64 = async (uri: string) => {
  return await new File(uri).base64();
};

export default toBase64;
