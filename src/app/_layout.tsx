import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import GlobalLayout from "@/components/layouts/global-layout";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import { Provider } from "react-bus";

dayjs.extend(customParseFormat);
dayjs.extend(duration);

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

if (Platform.OS === "android") {
  NavigationBar.setVisibilityAsync("hidden").then();
}

const RootLayout = () => {
  return (
    <Provider>
      <StatusBar style="dark" />
      <GestureHandlerRootView>
        <GlobalLayout>
          <Slot />
        </GlobalLayout>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default RootLayout;
