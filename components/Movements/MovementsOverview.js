import { Ionicons } from "@expo/vector-icons";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../../constants/styles";
import Home from "../../screens/Home";
import Movements from "../../screens/Movements";
import Recents from "../../screens/Recents";
import Settings from "../../screens/Settings";
import { AuthContext } from "../../store/auth-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useContext } from "react";
import { View } from "react-native";

const BottomTabs = createBottomTabNavigator();

export default function MovementsOverview() {
  const authCtx = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: GlobalStyles.backgrounds.secondary },
          headerTintColor: "white",
          tabBarStyle: {
            backgroundColor: GlobalStyles.backgrounds.secondary,
            borderTopWidth: 0
          },
          tabBarActiveTintColor: GlobalStyles.colors.accent,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate("ManageMovement")}
            />
          )
        })}
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
            title: "Configuracion",
            tabBarLabel: "Configuracion",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-sharp" size={size} color={color} />
            ),
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                onPress={authCtx.logout}
              />
            )
          }}
        />
      </BottomTabs.Navigator>
    </View>
  );
}
