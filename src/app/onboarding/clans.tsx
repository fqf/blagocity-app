import { FC } from "react";
import AuthLayout from "@/components/layouts/auth-layout";
import ClansScreen from "@/components/screens/onboarding/clans-screen";

const Clans: FC = () => {
  return (
    <AuthLayout>
      <ClansScreen />
    </AuthLayout>
  );
};

export default Clans;
