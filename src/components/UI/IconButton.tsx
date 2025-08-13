import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, ViewStyle, StyleProp } from "react-native";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function IconButton({
  icon,
  size = 24,
  color = "white",
  onPress,
  style
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonContainer,
        style,
        pressed && styles.pressed
      ]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8
  },
  pressed: {
    opacity: 0.75
  }
});
