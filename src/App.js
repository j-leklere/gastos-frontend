import { useCallback, useContext, useEffect, useState } from "react";
import { GlobalStyles } from "./constants/styles";

import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthContextProvider, { AuthContext } from "./store/auth-context";
import MovementsContextProvider from "./store/movements-context";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ManageMovement from "./screens/ManageMovement";

import MovementsOverview from "./components/Movements/MovementsOverview";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: GlobalStyles.backgrounds.secondary },
        // headerTintColor: "white",
        headerShown: false,
        contentStyle: { backgroundColor: GlobalStyles.backgrounds.secondary }
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.backgrounds.secondary },
        headerTintColor: "white"
      }}
    >
      <Stack.Screen
        name="MovementsOverview"
        component={MovementsOverview}
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
  const [ready, setReady] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function boot() {
      const token = await AsyncStorage.getItem("token");
      if (token) authCtx.authenticate(token);
      setReady(true);
    }
    boot();
  }, []);

  const onLayout = useCallback(async () => {
    if (ready) await SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && (
          <MovementsContextProvider>
            <AppStack />
          </MovementsContextProvider>
        )}
      </NavigationContainer>
    </View>
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
