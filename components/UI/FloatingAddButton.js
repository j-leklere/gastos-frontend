import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "../../navigationRef";
import LinearGradientContainer from "./LinearGradientContainer";

export default function FloatingAddButton() {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate("ManageMovement")}
      activeOpacity={0.8}
    >
      <LinearGradientContainer>
        <Ionicons name="add" size={28} color="#fff" />
      </LinearGradientContainer>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    right: 24,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  gradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
