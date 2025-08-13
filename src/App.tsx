import { useCallback, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GlobalStyles } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import MovementsContextProvider from "./store/movements-context";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ManageMovement from "./screens/ManageMovement";
import MovementsOverview from "./components/Movements/MovementsOverview";

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type AppStackParamList = {
  MovementsOverview: undefined;
  ManageMovement: undefined;
};

type AuthContextShape = {
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
};

const AuthStackNav = createNativeStackNavigator<AuthStackParamList>();
const AppStackNav = createNativeStackNavigator<AppStackParamList>();

function AuthStack() {
  return (
    <AuthStackNav.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: GlobalStyles.backgrounds.secondary }
      }}
    >
      <AuthStackNav.Screen name="Login" component={LoginScreen} />
      <AuthStackNav.Screen name="Signup" component={SignupScreen} />
    </AuthStackNav.Navigator>
  );
}

function AppStack() {
  return (
    <AppStackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.backgrounds.secondary },
        headerTintColor: "white"
      }}
    >
      <AppStackNav.Screen
        name="MovementsOverview"
        component={MovementsOverview}
        options={{ headerShown: false }}
      />
      <AppStackNav.Screen
        name="ManageMovement"
        component={ManageMovement}
        options={{ presentation: "modal" }}
      />
    </AppStackNav.Navigator>
  );
}

function Root() {
  const [ready, setReady] = useState<boolean>(false);
  const auth = useContext(AuthContext) as unknown as AuthContextShape;

  useEffect(() => {
    async function boot() {
      const token = await AsyncStorage.getItem("token");
      if (token) auth.authenticate(token);
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
        {!auth.isAuthenticated ? (
          <AuthStack />
        ) : (
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
