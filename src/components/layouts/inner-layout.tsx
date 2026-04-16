import { FC } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import COLORS from "@/constants/colors";
import Header, { THeaderProps } from "@/components/others/header";
import TContainerProps from "@/models/types/container-props";

type TProps = {
  title: string;
  containerStyle?: ViewStyle;
} & TContainerProps &
  THeaderProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
const InnerLayout: FC<TProps> = ({
  children,
  title,
  containerStyle,
  withBack,
  withClose,
  headerStyle,
  onClosePress,
  onBackPress,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
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
