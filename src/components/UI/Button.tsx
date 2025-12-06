import {
  Pressable,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  StyleProp
} from "react-native";
import { ReactNode } from "react";
import { GlobalStyles } from "../../constants/styles";

type Props = {
  children: ReactNode;
  onPress?: () => void;
  mode?: "flat";
  style?: StyleProp<ViewStyle>;
};

export default function Button({ children, onPress, mode, style }: Props) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  flat: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700"
  },
  flatText: {
    color: "#9ca3af",
    fontWeight: "600"
  },
  pressed: {
    opacity: 0.8
  }
});
