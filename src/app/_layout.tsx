import * as SplashScreen from "expo-splash-screen";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { FC } from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

if (Platform.OS === "android") {
  NavigationBar.setVisibilityAsync("hidden").then();
}

const RootLayout: FC = () => {
  return (
    <>
      <StatusBar style="dark" />
      <GestureHandlerRootView>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: Platform.OS === "android" ? "slide_from_right" : "ios_from_right",
          }}
        />
      </GestureHandlerRootView>
    </>
  );
};

export default RootLayout;
