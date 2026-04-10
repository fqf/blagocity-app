import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import TContainerProps from "@/models/types/container-props";
import CloseButton from "@/components/buttons/close-button";
import { useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import COLORS from "@/constants/colors";

type TProps = {
  title: string;
} & TContainerProps;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 24,
    color: COLORS.text,
  },
});
const ModalLayout: FC<TProps> = ({ title, children }) => {
  const router = useRouter();
  const handleOnClosePress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <CloseButton onPress={handleOnClosePress} />
          </View>
          {children}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ModalLayout;
