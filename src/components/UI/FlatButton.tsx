import { Pressable, StyleSheet, Text, View } from "react-native";
import { ReactNode } from "react";
import { Colors } from "../../constants/styles";

type Props = {
  children: ReactNode;
  onPress?: () => void;
};

export default function FlatButton({ children, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  pressed: {
    opacity: 0.7
  },
  buttonText: {
    textAlign: "center",
    color: Colors.primary100
  }
});
