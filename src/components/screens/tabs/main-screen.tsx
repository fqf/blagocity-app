import { FC } from "react";
import Mapbox, { Camera, MapView } from "@rnmapbox/maps";
import { StyleSheet } from "react-native";
import TabsLayout from "@/components/layouts/tabs-layout";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN!).then();

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
const MainScreen: FC = () => {
  const centerCoords = [37.6242786831254, 55.750175936150875];
  return (
    <TabsLayout>
      <MapView
        logoEnabled={false}
        attributionEnabled={false}
        scaleBarEnabled={false}
        localizeLabels={{ locale: "ru" }}
        style={styles.map}>
        <Camera defaultSettings={{ centerCoordinate: centerCoords, zoomLevel: 15 }} />
      </MapView>
    </TabsLayout>
  );
};

export default MainScreen;
