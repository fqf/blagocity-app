import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropShadow from "react-native-drop-shadow";
import Constants from "expo-constants";
import COLORS from "@/constants/colors";
import { useRouter } from "expo-router";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";

type TProps = {
  title: string;
  withBack?: boolean;
  onBackPress?: () => void;
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    height: Constants.statusBarHeight + 66,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight - 10,
  },
  title: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 20,
    color: COLORS.text,
  },
  button: {
    position: "absolute",
    left: 20,
    top: Constants.statusBarHeight + 12,
    padding: 5,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
const Header: FC<TProps> = ({ title, withBack, onBackPress }) => {
  const router = useRouter();
  const handleOnBackPress = () => {
    return (onBackPress?.() ?? router.canGoBack()) ? router.back() : null;
  };

  return (
    <DropShadow style={styles.shadow}>
      <View style={styles.container}>
        {withBack && (
          <TouchableOpacity activeOpacity={0.75} onPress={handleOnBackPress} style={styles.button}>
            <Icon icon={EIcon.Chevron} fill={COLORS.label} style={styles.icon} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </DropShadow>
  );
};

export default Header;
