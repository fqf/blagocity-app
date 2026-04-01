import * as SplashScreen from "expo-splash-screen";
import VideoSplashScreen from "@/components/screens/common/video-splash-screen";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const Index = () => {
  return <VideoSplashScreen />;
};

export default Index;
