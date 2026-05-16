import { FC, useEffect, useRef, useState } from "react";
import Mapbox, {
  Camera,
  MapState,
  MapView,
  MarkerView,
  PointAnnotation,
  ScreenPointPayload,
  UserLocation,
} from "@rnmapbox/maps";
import { Dimensions, StyleSheet, View } from "react-native";
import TabsLayout from "@/components/layouts/tabs-layout";
import MapButton from "@/components/buttons/map-button";
import EIcon from "@/models/enums/icon";
import Constants from "expo-constants";
import AvatarButton, { TAvatarType } from "@/components/buttons/avatar-button";
import AssistButton from "@/components/buttons/assist-button";
import * as Location from "expo-location";
import { debounce } from "lodash";
import { useRouter } from "expo-router";
import PinButton from "@/components/buttons/pin-button";
import { Feature, Point, Position } from "geojson";
import useProfileStore from "@/stores/profile-store";
import useMapStore from "@/stores/map-store";
import { useListener } from "react-bus";
import Button from "@/components/buttons/button";
import Preloader from "@/components/others/preloader";
import * as SecureStore from "expo-secure-store";
import { getMe } from "@/actions/user-actions";
import { getPlacesList } from "@/actions/place-actions";
import { isHTTPError, isKyError } from "ky";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN!).then();

export const defaultLocation: Position = [37.626728, 55.756476];
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
    bottom: 76,
    right: 20,
    gap: 10,
    alignItems: "flex-end",
  },
  assistContainer: {
    marginTop: 60,
  },
  addButton: {
    position: "absolute",
    zIndex: 1,
    elevation: 1,
  },
  preloaderContainer: {
    position: "absolute",
    zIndex: 1,
    elevation: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
const MapScreen: FC = () => {
  const [profilePending, setProfilePending] = useState(true);
  const [placesPending, setPlacesPending] = useState(true);
  const [pin, setPin] = useState<Position | null>(null);
  const [showAddButton, setShowAddButton] = useState(false);
  const [addButton, setAddButton] = useState<Position>();
  const [location, setLocation] = useState<Position>(defaultLocation);
  const router = useRouter();
  const { userData, setUserData } = useProfileStore();
  const { placesList, setPlacesList } = useMapStore();
  const mapRef = useRef<MapView>(null);
  const cameraRef = useRef<Camera>(null);
  const handleOnPlusPress = async () => {
    setShowAddButton(false);

    const currentZoom = await mapRef.current?.getZoom();
    cameraRef.current?.zoomTo((currentZoom ?? 15) + 1, 300);
  };
  const handleOnMinusPress = async () => {
    setShowAddButton(false);

    const currentZoom = await mapRef.current?.getZoom();
    cameraRef.current?.zoomTo((currentZoom ?? 15) - 1, 300);
  };
  const handleOnSetCurrentLocationPress = async () => {
    setShowAddButton(false);

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    const location = await Location.getLastKnownPositionAsync();

    cameraRef.current?.zoomTo(16);
    setLocation([location?.coords.longitude ?? defaultLocation[0], location?.coords.latitude ?? defaultLocation[1]]);
  };
  const handleOnMapMove = () => {
    setShowAddButton(false);
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
  const handleOnAddPress = () => {
    setPin(location);
    setAddButton([Dimensions.get("window").width / 2, Dimensions.get("window").height / 2]);
    setShowAddButton(true);
  };
  const handleOnPinDragStart = () => {
    setShowAddButton(false);
  };
  const handleOnPinDragEnd = ({ geometry, properties }: Feature<Point, ScreenPointPayload>) => {
    const { coordinates } = geometry;
    setPin(coordinates);

    const { screenPointX, screenPointY } = properties;
    setAddButton([screenPointX, screenPointY]);
    setShowAddButton(true);
  };
  const handleOnAddPlacePress = () => {
    setShowAddButton(false);
    setAddButton(undefined);
    setPin(null);
    router.push(`/tabs/map/location/edit/-1?coords=${pin}`);
  };
  const handleOnRemovePinPress = () => {
    setPin(null);
    setAddButton(undefined);
    setShowAddButton(false);
  };

  useListener("add-press", handleOnAddPress);
  useEffect(() => {
    //handleOnSetCurrentLocationPress().then();
  }, []);
  useEffect(() => {
    const token = SecureStore.getItem(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);

    (async () => {
      try {
        if (!token) {
          throw new Error("Bad token");
        }

        if (!userData) {
          setProfilePending(true);

          const userData = await getMe(token);
          setUserData(userData);
        }

        if (!placesList) {
          setPlacesPending(true);

          const placesList = await getPlacesList();
          setPlacesList(placesList);
        }
      } catch (e) {
        if (isHTTPError(e)) {
          console.error((e.data as any).detail);
        } else if (isKyError(e)) {
          console.error(e.message);
        }
      }

      setProfilePending(false);
      setPlacesPending(false);
    })();
  }, [userData, placesList, setPlacesList, setUserData]);

  return (
    <TabsLayout>
      {showAddButton && (
        <>
          <Button
            type="primary"
            icon={EIcon.Plus}
            text="Добавить локацию"
            style={[styles.addButton, { top: (addButton?.[1] ?? 0) - 90, left: (addButton?.[0] ?? 0) - 92 }]}
            onPress={handleOnAddPlacePress}
          />
          <Button
            error
            type="secondary"
            icon={EIcon.Minus}
            text="Удалить пин"
            style={[styles.addButton, { top: (addButton?.[1] ?? 0) + 15, left: (addButton?.[0] ?? 0) - 72 }]}
            onPress={handleOnRemovePinPress}
          />
        </>
      )}
      <MapView
        ref={mapRef}
        logoEnabled={false}
        attributionEnabled={false}
        scaleBarEnabled={false}
        localizeLabels={{ locale: "ru" }}
        projection="globe"
        style={styles.map}
        onTouchMove={handleOnMapMove}
        onCameraChanged={handleOnMapDrag}
        onLongPress={handleOnMapLongPress}>
        <Camera
          ref={cameraRef}
          defaultSettings={{ centerCoordinate: location, zoomLevel: 15 }}
          centerCoordinate={location}
          animationDuration={5}
        />
        <UserLocation animated showsUserHeadingIndicator />
        {pin && (
          <PointAnnotation
            draggable
            id="1"
            coordinate={pin}
            onDragStart={handleOnPinDragStart}
            onDragEnd={handleOnPinDragEnd}>
            <PinButton />
          </PointAnnotation>
        )}
        {placesList?.map(place => (
          <MarkerView key={place.guid} coordinate={[place.longitude, place.latitude]}>
            <PinButton href={`/tabs/map/location/${place.guid}`} />
          </MarkerView>
        ))}
      </MapView>
      <View style={styles.header}>
        <MapButton icon={EIcon.List} />
        <AvatarButton
          pending={profilePending}
          size="small"
          type={+(userData?.avatar ?? 1) as TAvatarType}
          onPress={handleOnAvatarPress}
        />
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
      {placesPending && (
        <View style={styles.preloaderContainer}>
          <Preloader />
        </View>
      )}
    </TabsLayout>
  );
};

export default MapScreen;
