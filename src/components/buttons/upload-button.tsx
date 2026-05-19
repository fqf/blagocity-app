import { FC } from "react";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import COLORS from "@/constants/colors";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImagePreview from "@/components/others/image-preview";
import uuid from "react-native-uuid";

export type TImage = { id: string; uri: string };
type TProps = {
  images: TImage[];
  setImages: (images: TImage[]) => void;
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 4,
  },
  uploadButton: {
    width: "100%",
    height: 128,
    backgroundColor: COLORS.blockBackground,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    borderStyle: "dashed",
    gap: 4,
  },
  icon: {
    width: 28,
    height: 28,
  },
  text: {
    fontFamily: "LexendDeca-Medium",
    fontSize: 14,
    color: COLORS.active,
  },
});
const UploadButton: FC<TProps> = ({ images, setImages }) => {
  const handleOnButtonPress = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Требуется доступ", "Требуется доступ к библиотеке фото.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets?.[0].uri) {
      setImages([...images, { id: uuid.v4(), uri: result.assets?.[0].uri }]);
    }
  };
  const handleOnDeleteImagePress = (id: string) => {
    setImages([...images.filter(image => image.id !== id)]);
  };

  return (
    <View style={styles.container}>
      {!!images.length && (
        <View style={styles.imagesContainer}>
          {images.map(image => (
            <ImagePreview key={image.id} uri={image.uri} onDeletePress={() => handleOnDeleteImagePress(image.id)} />
          ))}
        </View>
      )}
      <TouchableOpacity activeOpacity={0.75} style={styles.uploadButton} onPress={handleOnButtonPress}>
        <Icon icon={EIcon.Photo} fill={COLORS.icon} style={styles.icon} />
        <Text style={styles.text}>Добавить фото</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadButton;
