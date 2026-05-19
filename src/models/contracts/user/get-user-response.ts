type TGetUserResponse = {
  guid: string;
  login: string;
  gender: "Мужской" | "Женский";
  birthday: string;
  name: string;
  avatar: string;
};

export default TGetUserResponse;
