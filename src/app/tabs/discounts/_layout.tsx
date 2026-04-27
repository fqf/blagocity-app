import { FC } from "react";
import { Stack } from "expo-router";
import { Platform } from "react-native";

const DiscountsLayout: FC = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === "android" ? "slide_from_right" : "ios_from_right",
      }}>
      <Stack.Screen
        name="(modals)/action/coupon"
        options={{ presentation: "transparentModal", animation: "slide_from_bottom", animationDuration: 250 }}
      />
    </Stack>
  );
};

export default DiscountsLayout;
