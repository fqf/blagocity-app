import { FC } from "react";
import { useLocalSearchParams } from "expo-router";
import ActionScreen from "@/components/screens/tabs/action-screen";

const Action: FC = () => {
  const { id }: { id: string } = useLocalSearchParams();
  return <ActionScreen id={id} />;
};

export default Action;
