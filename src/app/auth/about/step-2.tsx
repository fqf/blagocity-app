import { FC } from "react";
import AboutStepsLayout from "@/components/layouts/about-steps-layout";
import Step2Screen from "@/components/screens/auth/about/step-2-screen";

const AboutStep2: FC = () => {
  return (
    <AboutStepsLayout step={2} title="Выберите, что вам подходит">
      <Step2Screen />
    </AboutStepsLayout>
  );
};

export default AboutStep2;
