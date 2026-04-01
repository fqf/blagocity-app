import { StyleSheet, View } from "react-native";
import { useVideoPlayer, VideoPlayerStatus, VideoView } from "expo-video";
import { useEventListener } from "expo";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

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
  const [videoStatus, setVideoStatus] = useState<VideoPlayerStatus>("loading");
  const player = useVideoPlayer({ uri: "intro" }, player => {
    player.loop = false;
    player.play();
  });
  const router = useRouter();

  useEventListener(player, "statusChange", ({ status }) => {
    setVideoStatus(status);
  });

  useEffect(() => {
    if (videoStatus === "idle") {
      router.replace("/auth/sign-in");
    }
  }, [router, videoStatus]);

  return (
    <View style={styles.container}>
      <VideoView player={player} nativeControls={false} fullscreenOptions={{ enable: true }} style={styles.video} />
    </View>
  );
};

export default VideoSplashScreen;
