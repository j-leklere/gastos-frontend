import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import AuthForm from "./AuthForm";

interface AuthContentProps {
  isLogin: boolean;
  onAuthenticate: (credentials: { email: string; password: string }) => void;
}

export default function AuthContent({
  isLogin,
  onAuthenticate
}: AuthContentProps) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false
  });

  function submitHandler(credentials: {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
  }) {
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
        confirmPassword: !passwordIsValid || !passwordsAreEqual
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
