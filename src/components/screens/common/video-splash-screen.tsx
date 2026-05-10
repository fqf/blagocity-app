import { StyleSheet, View } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEventListener } from "expo";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
const VideoSplashScreen = () => {
  const player = useVideoPlayer({ uri: "intro" }, player => {
    player.loop = false;
    player.volume = 1;
    player.play();
  });
  const router = useRouter();

  useEventListener(player, "statusChange", ({ status }) => {
    if (status === "idle") {
      const token = SecureStore.getItem(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);

      if (token) {
        router.replace("/tabs/map");
      } else {
        router.replace("/auth/sign-in");
      }
    }
  });

  return (
    <View style={styles.container}>
      <VideoView player={player} nativeControls={false} fullscreenOptions={{ enable: true }} style={styles.video} />
    </View>
  );
};

export default VideoSplashScreen;
