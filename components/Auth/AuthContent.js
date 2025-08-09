import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";

import AuthForm from "./AuthForm";

function AuthContent({ isLogin, onAuthenticate }) {
  // const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  // function switchAuthModeHandler() {
  //   if (isLogin) {
  //     navigation.replace("Signup");
  //   } else {
  //     navigation.replace("Login");
  //   }
  // }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <View style={styles.authHeader}>
        <Text style={[styles.headerText, styles.headerTextBig]}>
          Inicia sesion
        </Text>
        <Text style={[styles.headerText, styles.headerTextSmall]}>
          Gestiona tus gastos de forma simple y rapida
        </Text>
      </View>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      {/* <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Crear cuenta" : "Iniciar sesión"}
        </FlatButton>
      </View> */}
    </View>
  );
}

export default AuthContent;

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
    shadowRadius: 4,
  },
  authHeader: {
    marginBottom: 16,
    gap: 4,
  },
  headerText: {
    color: "white",
  },
  headerTextBig: {
    fontSize: 20,
    fontWeight: 700,
  },
  headerTextSmall: {
    fontSize: 12,
    fontWeight: 300,
  },
  buttons: {
    marginTop: 8,
  },
});
