import { FC, useEffect, useState } from "react";
import Mapbox, { Camera, MapState, MapView, MarkerView } from "@rnmapbox/maps";
import { StyleSheet, View } from "react-native";
import TabsLayout from "@/components/layouts/tabs-layout";
import MapButton from "@/components/buttons/map-button";
import EIcon from "@/models/enums/icon";
import Constants from "expo-constants";
import AvatarButton from "@/components/buttons/avatar-button";
import AssistButton from "@/components/buttons/assist-button";
import * as Location from "expo-location";
import { debounce } from "lodash";
import { useRouter } from "expo-router";
import PinButton from "@/components/buttons/pin-button";
import { Feature, Point } from "geojson";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN!).then();

const defaultLocation: [number, number] = [37.616371, 55.757537];
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  header: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    top: Constants.statusBarHeight + 10,
  },
  mapTools: {
    position: "absolute",
    bottom: 64,
    right: 20,
    gap: 10,
    alignItems: "flex-end",
  },
  assistContainer: {
    marginTop: 60,
  },
});
const MapScreen: FC = () => {
  const [zoomLevel, setZoomLevel] = useState(16);
  const [location, setLocation] = useState<[number, number]>(defaultLocation);
  const router = useRouter();
  const handleOnPlusPress = () => {
    setZoomLevel(prev => prev + 1);
  };
  const handleOnMinusPress = () => {
    setZoomLevel(prev => prev - 1);
  };
  const handleOnSetCurrentLocationPress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    const location = await Location.getLastKnownPositionAsync();

    setZoomLevel(16);
    setLocation([location?.coords.longitude ?? defaultLocation[0], location?.coords.latitude ?? defaultLocation[1]]);
  };
  const handleOnMapDrag = debounce((mapState: MapState) => {
    setLocation(mapState.properties.center as [number, number]);
  }, 150);
  const handleOnAvatarPress = () => {
    router.push("/tabs/map/settings");
  };
  const handleOnMapLongPress = async ({ geometry }: Feature<Point>) => {
    const { coordinates } = geometry;
    router.push(`/tabs/map/location/edit/-1?coords=${coordinates}`);
  };

  useEffect(() => {
    handleOnSetCurrentLocationPress().then();
  }, []);

  return (
    <TabsLayout>
      <MapView
        logoEnabled={false}
        attributionEnabled={false}
        scaleBarEnabled={false}
        localizeLabels={{ locale: "ru" }}
        projection="globe"
        style={styles.map}
        onCameraChanged={handleOnMapDrag}
        onLongPress={handleOnMapLongPress}>
        <Camera
          defaultSettings={{ centerCoordinate: location, zoomLevel: 15 }}
          zoomLevel={zoomLevel}
          centerCoordinate={location}
          animationDuration={5}
        />
        <MarkerView coordinate={[37.390489, 55.869463]}>
          <PinButton href="/tabs/map/location/117" />
        </MarkerView>
      </MapView>
      <View style={styles.header}>
        <MapButton icon={EIcon.List} />
        <AvatarButton size="small" type={1} onPress={handleOnAvatarPress} />
        <MapButton icon={EIcon.Filter} />
      </View>
      <View style={styles.mapTools}>
        <MapButton icon={EIcon.Plus} onPress={handleOnPlusPress} />
        <MapButton icon={EIcon.Minus} onPress={handleOnMinusPress} />
        <MapButton icon={EIcon.Location} onPress={handleOnSetCurrentLocationPress} />
        <View style={styles.assistContainer}>
          <AssistButton />
        </View>
      </View>
    </TabsLayout>
  );
};

export default MapScreen;
