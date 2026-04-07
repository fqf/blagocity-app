import * as SplashScreen from "expo-splash-screen";
import { Redirect } from "expo-router";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const Index = () => {
  //return <VideoSplashScreen />;
  return <Redirect href="/tabs/main" />;
};

export default Index;
