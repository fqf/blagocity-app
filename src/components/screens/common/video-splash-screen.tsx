import { StyleSheet, View } from "react-native";
import { useVideoPlayer, VideoPlayerStatus, VideoView } from "expo-video";
import { useEventListener } from "expo";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import useProfileStore from "@/stores/profile-store";
import { getMe } from "@/actions/user-actions";
import useMapStore from "@/stores/map-store";
import { getPlacesList } from "@/actions/place-actions";

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
    player.volume = 1;
    player.play();
  });
  const router = useRouter();
  const { setUserData } = useProfileStore();
  const { setPlacesList } = useMapStore();

  useEventListener(player, "statusChange", ({ status }) => {
    setVideoStatus(status);
  });

  useEffect(() => {
    if (videoStatus === "idle") {
      const token = SecureStore.getItem(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);

      if (token) {
        (async () => {
          const userData = await getMe(token);
          setUserData(userData);

          const placesList = await getPlacesList();
          setPlacesList(placesList);

          router.replace("/tabs/map");
        })();
      } else {
        router.replace("/auth/sign-in");
      }
    }
  }, [router, setPlacesList, setUserData, videoStatus]);

  return (
    <View style={styles.container}>
      <VideoView player={player} nativeControls={false} fullscreenOptions={{ enable: true }} style={styles.video} />
    </View>
  );
};

export default VideoSplashScreen;
