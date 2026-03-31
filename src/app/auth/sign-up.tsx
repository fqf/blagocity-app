import { FC } from "react";
import AuthLayout from "@/components/layouts/auth-layout";
import SignUpScreen from "@/components/screens/auth/sign-up-screen";

const SignUp: FC = () => {
  return (
    <AuthLayout>
      <SignUpScreen />
    </AuthLayout>
  );
};

export default SignUp;
