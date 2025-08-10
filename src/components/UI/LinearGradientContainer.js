import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function LinearGradientContainer({ style, children }) {
  return (
    <LinearGradient
      colors={["#2863EB", "#9339D0"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    padding: 8,
    // margin: 16,
    borderRadius: 12
  }
});
