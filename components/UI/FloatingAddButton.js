import { StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradientContainer from "./LinearGradientContainer";

export default function FloatingAddButton() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const bottom = insets.bottom;

  function onPress() {
    navigation.navigate("ManageMovement");
  }

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <Pressable onPress={onPress} style={[styles.wrapper, { bottom }]}>
        <LinearGradientContainer style={styles.gradient}>
          <Ionicons name="add" size={28} color="white" />
        </LinearGradientContainer>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    right: 16,
    zIndex: 10000,
  },
  gradient: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
});
