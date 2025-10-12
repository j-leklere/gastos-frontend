import { StyleSheet, Pressable, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradientContainer from "./LinearGradientContainer";

type RootStackParamList = {
  ManageMovement: undefined;
};

type FloatingAddButtonProps = {
  position?: "navbar" | "bottomRight" | "custom";
  customStyle?: object;
  size?: number;
  iconSize?: number;
  offsetY?: number;
  onPress?: () => void;
};

export default function FloatingAddButton({
  position = "bottomRight",
  customStyle,
  size = 56,
  iconSize = 28,
  offsetY = 0,
  onPress: customOnPress
}: FloatingAddButtonProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { bottom } = useSafeAreaInsets();

  function handlePress() {
    if (customOnPress) {
      customOnPress();
    } else {
      navigation.navigate("ManageMovement");
    }
  }

  const getWrapperStyle = () => {
    switch (position) {
      case "navbar":
        return [
          styles.navbarWrapper,
          {
            bottom: bottom + 16 + offsetY,
            transform: [{ translateX: -size / 2 }]
          }
        ];
      case "bottomRight":
        return [styles.bottomRightWrapper, { bottom: bottom + 16, right: 16 }];
      case "custom":
        return customStyle;
      default:
        return styles.bottomRightWrapper;
    }
  };

  const containerStyle =
    position === "navbar"
      ? { ...StyleSheet.absoluteFillObject, pointerEvents: "box-none" as const }
      : { pointerEvents: "box-none" as const };

  return (
    <View style={containerStyle}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          getWrapperStyle()
          // pressed && styles.pressed
        ]}
      >
        <LinearGradientContainer
          style={[
            styles.gradient,
            {
              width: size,
              height: size,
              borderRadius: size / 2
            }
          ]}
        >
          <Ionicons name="add" size={iconSize} color="white" />
        </LinearGradientContainer>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarWrapper: {
    position: "absolute",
    left: "50%",
    zIndex: 10000,
    elevation: 10
  },
  bottomRightWrapper: {
    position: "absolute",
    zIndex: 10000,
    elevation: 10
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center"
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // shadowOffset: { width: 0, height: 4 },
    // elevation: 2
  }
  // pressed: {
  //   opacity: 0.85,
  //   transform: [{ scale: 0.95 }]
  // }
});
