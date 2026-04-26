import { FC } from "react";
import { Stack } from "expo-router";
import { Platform } from "react-native";

const DiscountsLayout: FC = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === "android" ? "slide_from_right" : "ios_from_right",
      }}
    />
  );
};

export default DiscountsLayout;
