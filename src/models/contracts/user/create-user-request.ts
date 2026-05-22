type TCreateUserRequest = {
  login: string;
  gender: "Мужской" | "Женский";
  password: string;
  birthday: string;
  name: string;
  avatar: string;
  media?: string;
  roles: string[];
  disabilityTypes: string[];
};

export default TCreateUserRequest;
