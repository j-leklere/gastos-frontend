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
    borderRadius: 4
  },
  flat: {
    backgroundColor: "transparent"
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  },
  flatText: {
    color: "white",
    fontWeight: "200" // RN espera string, no number
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary,
    borderRadius: 4
  }
});
