import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropShadow from "react-native-drop-shadow";
import Constants from "expo-constants";
import COLORS from "@/constants/colors";
import { useRouter } from "expo-router";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import CloseButton from "@/components/buttons/close-button";

export type THeaderProps = {
  title: string;
  withBack?: boolean;
  withClose?: boolean;
  headerStyle?: ReturnType<typeof StyleSheet.create>;
  onBackPress?: () => void;
  onClosePress?: () => void;
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    elevation: 1000,
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
  backButton: {
    position: "absolute",
    left: 20,
    top: Constants.statusBarHeight + 12,
    padding: 5,
  },
  closeButton: {
    position: "absolute",
    right: 20,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
const Header: FC<THeaderProps> = ({ title, withBack, withClose, headerStyle, onBackPress, onClosePress }) => {
  const router = useRouter();
  const handleOnBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }

    return router.canGoBack() ? router.back() : null;
  };
  const handleOnClosePress = () => {
    if (onClosePress) {
      onClosePress();
    }

    return router.canGoBack() ? router.back() : null;
  };

  return (
    <DropShadow style={styles.shadow}>
      <View style={[styles.container, headerStyle]}>
        {withBack && (
          <TouchableOpacity activeOpacity={0.75} onPress={handleOnBackPress} style={styles.backButton}>
            <Icon icon={EIcon.ChevronLeft} fill={COLORS.label} style={styles.icon} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        {withClose && <CloseButton style={styles.closeButton} onPress={handleOnClosePress} />}
      </View>
    </DropShadow>
  );
};

export default Header;
