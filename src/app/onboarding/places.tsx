import { FC } from "react";
import AuthLayout from "@/components/layouts/auth-layout";
import PlacesScreen from "@/components/screens/onboarding/places-screen";

const Places: FC = () => {
  return (
    <AuthLayout>
      <PlacesScreen />
    </AuthLayout>
  );
};

export default Places;
