import { FC } from "react";
import TContainerProps from "@/models/types/container-props";
import { StyleSheet, View } from "react-native";
import GlobalLayout from "@/components/layouts/global-layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const AuthLayout: FC<TContainerProps> = ({ children }) => {
  return (
    <GlobalLayout>
      <View style={styles.container}>{children}</View>
    </GlobalLayout>
  );
};

export default AuthLayout;
