import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import ShadowBlock from "@/components/blocks/shadow-block";
import COLORS from "@/constants/colors";
import { Image } from "expo-image";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import DropShadow from "react-native-drop-shadow";

type TProps = {
  coords: string;
  address: string;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  label: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 14,
    color: COLORS.text,
  },
  mapContainer: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  shadow: {
    position: "absolute",
    bottom: 8,
    marginHorizontal: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text: {
    fontFamily: "LexendDeca-Medium",
    fontSize: 12,
    color: COLORS.text,
  },
  icon: {
    width: 40,
    height: 40,
    position: "absolute",
    marginBottom: 30,
  },
});
const GeoPositionBlock: FC<TProps> = ({ coords, address }) => {
  return (
    <ShadowBlock>
      <View style={styles.container}>
        <Text style={styles.label}>Уточните геопозицию</Text>
        <View style={styles.mapContainer}>
          <Image
            source={{
              uri: `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${coords},17/500x500?access_token=${process.env.EXPO_PUBLIC_MAPBOX_TOKEN!}`,
            }}
            style={styles.map}
          />
          <DropShadow style={styles.shadow}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{address}</Text>
            </View>
          </DropShadow>
          <Icon icon={EIcon.Pin} style={styles.icon} />
        </View>
      </View>
    </ShadowBlock>
  );
};

export default GeoPositionBlock;
