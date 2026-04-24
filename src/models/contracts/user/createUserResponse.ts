type TCreateUserResponse = {
  guid: string;
  email: string;
  gender: "Мужской" | "Женский";
  birthday: string;
  name: string;
  media: {
    createdAt: string;
  };
  roles: {
    guid: string;
    name: string;
    description: string;
  }[];
  disabilityTypes: {
    guid: string;
    name: string;
    fullName: string;
    displayName: string;
    description: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

export default TCreateUserResponse;
