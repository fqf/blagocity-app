import { FC } from "react";
import { StyleSheet, View } from "react-native";
import COLORS from "@/constants/colors";
import Header, { THeaderProps } from "@/components/others/header";
import TContainerProps from "@/models/types/container-props";

type TProps = {
  title: string;
} & TContainerProps &
  THeaderProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
const InnerLayout: FC<TProps> = ({ children, title, withBack, withClose, headerStyle, onClosePress, onBackPress }) => {
  return (
    <View style={styles.container}>
      <Header
        withBack={withBack}
        withClose={withClose}
        title={title}
        headerStyle={headerStyle}
        onClosePress={onClosePress}
        onBackPress={onBackPress}
      />
      {children}
    </View>
  );
};

export default InnerLayout;
