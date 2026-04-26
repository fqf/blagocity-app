import { FC } from "react";
import ShadowBlock from "@/components/blocks/shadow-block";
import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/buttons/button";
import { Image } from "expo-image";
import COLORS from "@/constants/colors";
import Feature from "@/components/others/feature";
import EIcon from "@/models/enums/icon";
import DropShadow from "react-native-drop-shadow";

type TProps = {
  image: string;
  title: string;
  description: string;
  discount: string;
  onButtonPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    gap: 16,
    overflow: "hidden",
  },
  image: {
    height: 128,
  },
  discount: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  texts: {
    paddingHorizontal: 16,
    gap: 4,
  },
  title: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 18,
    color: COLORS.text,
  },
  description: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.label,
  },
  buttons: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
const DiscountBlock: FC<TProps> = ({ image, title, description, discount, onButtonPress }) => {
  return (
    <ShadowBlock>
      <View style={styles.container}>
        <Image
          source={{
            uri: image,
          }}
          contentFit="cover"
          style={styles.image}
        />
        <View style={styles.discount}>
          <DropShadow style={styles.shadow}>
            <Feature variant="error" icon={EIcon.Label} title={discount.toString()} />
          </DropShadow>
        </View>
        <View style={styles.texts}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.buttons}>
          <Button inverted type="primary" text="Описание акции" onPress={onButtonPress} />
        </View>
      </View>
    </ShadowBlock>
  );
};

export default DiscountBlock;
