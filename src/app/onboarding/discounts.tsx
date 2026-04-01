import { FC } from "react";
import AuthLayout from "@/components/layouts/auth-layout";
import DiscountsScreen from "@/components/screens/onboarding/discounts-screen";

const Discounts: FC = () => {
  return (
    <AuthLayout>
      <DiscountsScreen />
    </AuthLayout>
  );
};

export default Discounts;
