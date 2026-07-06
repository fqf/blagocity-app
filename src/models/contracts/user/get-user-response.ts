type TGetUserResponse = {
  guid: string;
  login: string;
  gender: "Мужской" | "Женский";
  birthday: string;
  name: string;
  avatar: string;
  establishmentUsers: {
    createdAt: string;
    updatedAt: string;
    establishment: {
      guid: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
};

export default TGetUserResponse;
