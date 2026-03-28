import { FC } from "react";
import AuthLayout from "@/components/layouts/auth-layout";
import LoginScreen from "@/components/screens/auth/login-screen";

const Login: FC = () => {
  return (
    <AuthLayout>
      <LoginScreen />
    </AuthLayout>
  );
};

export default Login;
