type TCreateUserRequest = {
  email: string;
  gender: "Мужской" | "Женский";
  password: string;
  birthday: string;
  name: string;
  media: string;
  roles: {
    name: string;
    description: string;
  }[];
  disabilityTypes: {
    name: string;
    fullName: string;
    displayName: string;
    description: string;
  }[];
};

export default TCreateUserRequest;
