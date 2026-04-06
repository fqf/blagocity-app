import { FC } from "react";
import Mapbox, { Camera, MapView } from "@rnmapbox/maps";
import { StyleSheet } from "react-native";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiZnFmMTE3IiwiYSI6ImNtbmpma3NobTBpdG4ycXM0bmdsbTNzMDYifQ.ywHGgGA43ijPcGAl7jwtfw",
).then();

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
const MainScreen: FC = () => {
  const centerCoords = [37.6242786831254, 55.750175936150875];
  return (
    <MapView
      logoEnabled={false}
      attributionEnabled={false}
      scaleBarEnabled={false}
      localizeLabels={{ locale: "ru" }}
      style={styles.map}>
      <Camera defaultSettings={{ centerCoordinate: centerCoords, zoomLevel: 15 }} />
    </MapView>
  );
};

export default MainScreen;
