import { FC } from "react";
import { StyleSheet, View } from "react-native";
import TContainerProps from "@/models/types/container-props";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import COLORS from "@/constants/colors";
import Header from "@/components/others/header";

type TProps = {
  title: string;
} & TContainerProps;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  header: {
    height: 80,
    paddingTop: 0,
  },
  title: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 24,
    color: COLORS.text,
  },
});
const ModalLayout: FC<TProps> = ({ title, children }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <Header withClose title={title} headerStyle={styles.header} />
          {children}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ModalLayout;
