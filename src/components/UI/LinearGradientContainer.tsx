import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, ViewStyle, StyleProp } from "react-native";
import { ReactNode } from "react";

type Props = {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export default function LinearGradientContainer({ style, children }: Props) {
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
    borderRadius: 12
  }
});
