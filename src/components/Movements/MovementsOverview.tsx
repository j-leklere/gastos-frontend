// MovementsOverview.tsx
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import Home from "../../screens/Home";
import Movements from "../../screens/Movements";
import Recents from "../../screens/Recents";
import Settings from "../../screens/Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import FloatingAddButton from "../UI/FloatingAddButton";

type TabsParamList = {
  Home: undefined;
  Recientes: undefined;
  AddMovement: undefined;
  Movements: undefined;
  Configuracion: undefined;
};

const BottomTabs = createBottomTabNavigator<TabsParamList>();

export default function MovementsOverview() {
  return (
    <View style={{ flex: 1 }}>
      <BottomTabs.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: GlobalStyles.backgrounds.secondary },
          headerTintColor: "white",
          tabBarStyle: {
            backgroundColor: GlobalStyles.backgrounds.secondary,
            borderTopWidth: 0,
            height: 70,
            paddingBottom: 8,
            paddingTop: 8
          },
          tabBarActiveTintColor: "#60a5fa",
          tabBarInactiveTintColor: "#6b7280",
          tabBarShowLabel: false
        }}
      >
        <BottomTabs.Screen
          name="Home"
          component={Home}
          options={{
            title: "Inicio",
            tabBarLabel: "Inicio",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            )
          }}
        />

        <BottomTabs.Screen
          name="Recientes"
          component={Recents}
          options={{
            title: "Recientes",
            tabBarLabel: "Recientes",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            )
          }}
        />

        <BottomTabs.Screen
          name="AddMovement"
          component={View}
          options={{
            tabBarLabel: "",
            tabBarIcon: () => null,
            tabBarButton: () => null
          }}
        />

        <BottomTabs.Screen
          name="Movements"
          component={Movements}
          options={{
            title: "Movimientos",
            tabBarLabel: "Movimientos",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="swap-horizontal" size={size} color={color} />
            )
          }}
        />

        <BottomTabs.Screen
          name="Configuracion"
          component={Settings}
          options={{
            title: "Configuración",
            tabBarLabel: "Configuración",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-sharp" size={size} color={color} />
            )
          }}
        />
      </BottomTabs.Navigator>

      <FloatingAddButton position="navbar" size={60} iconSize={32} />
    </View>
  );
}
