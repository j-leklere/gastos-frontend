import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import ManageMovement from "./screens/ManageMovement";
import Home from "./screens/Home";
import Recents from "./screens/Recents";
import Movements from "./screens/Movements";

import AuthContextProvider, { AuthContext } from "./store/auth-context";
import MovementsContextProvider from "./store/movements-context";
import { useContext, useEffect, useState } from "react";
import Settings from "./screens/Settings";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: GlobalStyles.backgrounds.secondary },
        // headerTintColor: "white",
        headerShown: false,
        contentStyle: { backgroundColor: GlobalStyles.backgrounds.secondary },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function ExpensesOverview() {
  const authCtx = useContext(AuthContext);

  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.backgrounds.secondary },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.backgrounds.secondary,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("ManageMovement")}
          />
        ),
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
          ),
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
          ),
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
          ),
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
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.backgrounds.secondary },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="ExpensesOverview"
        component={ExpensesOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageMovement"
        component={ManageMovement}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function loadToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        authCtx.authenticate(token);
      }
      setIsTryingLogin(false);
    }
    loadToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && (
        <MovementsContextProvider>
          <AppStack />
        </MovementsContextProvider>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
