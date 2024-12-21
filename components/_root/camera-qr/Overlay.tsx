import { Dimensions, Platform, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

export const Overlay = () => {
  return (
    <View
      style={
        Platform.OS === "android"
          ? { flex: 1, justifyContent: "center", alignItems: "center" }
          : StyleSheet.absoluteFillObject
      }
    >
      <View
        style={{
          width: width / 2,
          height: height / 4,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: 30,
        }}
      ></View>
    </View>
  );
};
