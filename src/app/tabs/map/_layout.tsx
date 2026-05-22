import { FC } from "react";
import { Stack } from "expo-router";
import { Platform } from "react-native";

const MapLayout: FC = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === "android" ? "slide_from_right" : "ios_from_right",
      }}>
      <Stack.Screen
        name="(modals)/place/call"
        options={{ presentation: "transparentModal", animation: "slide_from_bottom", animationDuration: 250 }}
      />
      <Stack.Screen
        name="(modals)/place/edit/[id]"
        options={{ presentation: "transparentModal", animation: "slide_from_bottom", animationDuration: 250 }}
      />
      <Stack.Screen
        name="(modals)/review/edit/[id]"
        options={{ presentation: "transparentModal", animation: "slide_from_bottom", animationDuration: 250 }}
      />
    </Stack>
  );
};

export default MapLayout;
