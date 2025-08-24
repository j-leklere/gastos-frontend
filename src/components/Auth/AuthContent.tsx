import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import AuthForm from "./AuthForm";
import FlatButton from "../UI/FlatButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginPayload, RegisterPayload } from "@/services/auth";

type RootParamList = {
  Login: undefined;
  Signup: undefined;
};

type AuthNav = NativeStackNavigationProp<RootParamList>;

type AuthContentProps =
  | {
      isLogin: true;
      onAuthenticate: (payload: LoginPayload) => void | Promise<void>;
    }
  | {
      isLogin?: false;
      onAuthenticate: (payload: RegisterPayload) => void | Promise<void>;
    };

export default function AuthContent({
  isLogin,
  onAuthenticate
}: AuthContentProps) {
  const navigation = useNavigation<AuthNav>();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    username: false,
    email: false,
    password: false
  });

  function switchAuthModeHandler() {
    if (isLogin) navigation.replace("Signup");
    else navigation.replace("Login");
  }

  function submitHandler(credentials: LoginPayload | RegisterPayload) {
    const username = credentials.username.trim();
    const password = credentials.password.trim();
    const email = "email" in credentials ? credentials.email.trim() : "";

    const usernameIsValid = username.length >= 6;
    const passwordIsValid = password.length >= 6;

    if (isLogin) {
      if (!usernameIsValid || !passwordIsValid) {
        Alert.alert("Datos inválidos", "Revisá usuario y contraseña.");
        setCredentialsInvalid({
          username: !usernameIsValid,
          email: false,
          password: !passwordIsValid
        });
        return;
      }
      onAuthenticate({ username, password });
      return;
    }

    const emailIsValid = email.includes("@");
    if (!usernameIsValid || !emailIsValid || !passwordIsValid) {
      console.log(usernameIsValid);
      console.log(emailIsValid);
      console.log(passwordIsValid);
      Alert.alert("Datos inválidos", "Revisá usuario, email y contraseña.");
      setCredentialsInvalid({
        username: !usernameIsValid,
        email: !emailIsValid,
        password: !passwordIsValid
      });
      return;
    }

    onAuthenticate({ username, email, password });
  }

  return (
    <View style={styles.authContent}>
      <View style={styles.authHeader}>
        <Text style={[styles.headerText, styles.headerTextBig]}>
          Inicia sesión
        </Text>
        <Text style={[styles.headerText, styles.headerTextSmall]}>
          Gestiona tus gastos de forma simple y rápida
        </Text>
      </View>

      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />

      <View>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Crear cuenta" : "Iniciar sesión"}
        </FlatButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#182130",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4
  },
  authHeader: {
    marginBottom: 16,
    gap: 4
  },
  headerText: {
    color: "white"
  },
  headerTextBig: {
    fontSize: 20,
    fontWeight: "700"
  },
  headerTextSmall: {
    fontSize: 12,
    fontWeight: "300"
  }
});
