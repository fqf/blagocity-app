import { FC } from "react";
import AuthLayout from "@/components/layouts/auth-layout";
import SignInScreen from "@/components/screens/auth/sign-in-screen";

const SignIn: FC = () => {
  return (
    <AuthLayout>
      <SignInScreen />
    </AuthLayout>
  );
};

export default SignIn;
