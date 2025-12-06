import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Settings() {
  return (
    <LinearGradient
      colors={["#111828", "#171E2D"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.text}>CONFIG</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 52,
    padding: 8
  },
  text: {
    color: "white",
    fontSize: 18
  }
});
