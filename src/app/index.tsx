import { FC } from "react";
import { Redirect } from "expo-router";

const Index: FC = () => {
  return <Redirect href="/auth/sign-in" />;
};

export default Index;
