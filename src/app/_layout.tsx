import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

if (Platform.OS === "android") {
  NavigationBar.setVisibilityAsync("hidden").then();
}

const RootLayout = () => {
  return (
    <>
      <StatusBar style="dark" />
      <GestureHandlerRootView>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: Platform.OS === "android" ? "slide_from_right" : "ios_from_right",
          }}>
          <Stack.Screen name="auth/sign-in" options={{ animation: "none" }} />
          <Stack.Screen name="auth/sign-up" options={{ animation: "none" }} />
          <Stack.Screen name="auth/restore" options={{ animation: "none" }} />
          <Stack.Screen name="tabs/main/index" options={{ animation: "none" }} />
          <Stack.Screen name="tabs/discounts/index" options={{ animation: "none" }} />
          <Stack.Screen name="tabs/clan/index" options={{ animation: "none" }} />
          <Stack.Screen name="tabs/search/index" options={{ animation: "none" }} />
        </Stack>
      </GestureHandlerRootView>
    </>
  );
};

export default RootLayout;
