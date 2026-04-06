import { FC } from "react";
import AboutStepsLayout from "@/components/layouts/about-steps-layout";
import Step1Screen from "@/components/screens/auth/about/step-1-screen";

const AboutStep1: FC = () => {
  return (
    <AboutStepsLayout step={1} title="Расскажите о себе">
      <Step1Screen />
    </AboutStepsLayout>
  );
};

export default AboutStep1;
