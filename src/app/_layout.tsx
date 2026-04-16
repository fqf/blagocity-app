import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import GlobalLayout from "@/components/layouts/global-layout";
import "dayjs/locale/ru";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

if (Platform.OS === "android") {
  NavigationBar.setVisibilityAsync("hidden").then();
}

const RootLayout = () => {
  return (
    <>
      <StatusBar style="dark" />
      <GestureHandlerRootView>
        <GlobalLayout>
          <Slot />
        </GlobalLayout>
      </GestureHandlerRootView>
    </>
  );
};

export default RootLayout;
