import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../UI/Button";
import Input from "./Input";
import LinearGradientContainer from "../UI/LinearGradientContainer";
import IconButton from "../UI/IconButton";

type LoginCredentials = { username: string; password: string };
type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
};

interface AuthFormProps {
  isLogin: boolean | undefined;
  onSubmit: (credentials: LoginCredentials | RegisterCredentials) => void;
  credentialsInvalid: {
    username: boolean;
    email: boolean;
    password: boolean;
  };
}

function AuthForm({ isLogin, onSubmit, credentialsInvalid }: AuthFormProps) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const {
    username: usernameIsInvalid,
    email: emailIsInvalid,
    password: passwordIsInvalid
  } = credentialsInvalid;

  function updateInputValueHandler(
    inputType: "username" | "email" | "password",
    enteredValue: string
  ) {
    switch (inputType) {
      case "username":
        setEnteredUsername(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    if (isLogin) {
      onSubmit({ username: enteredUsername, password: enteredPassword });
    } else {
      onSubmit({
        username: enteredUsername,
        email: enteredEmail,
        password: enteredPassword
      });
    }
  }

  return (
    <View>
      <View>
        <Input
          label="Username"
          onUpdateValue={updateInputValueHandler.bind(null, "username")}
          value={enteredUsername}
          isInvalid={usernameIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Correo electrónico"
            onUpdateValue={updateInputValueHandler.bind(null, "email")}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
          />
        )}
        <Input
          label="Contraseña"
          onUpdateValue={updateInputValueHandler.bind(null, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        <LinearGradientContainer style={styles.buttons}>
          <View>
            <Button onPress={submitHandler}>
              {isLogin ? (
                <View style={styles.buttonWithIcon}>
                  <IconButton icon="log-in-outline" size={24} color="white" />
                  <Text style={styles.buttonText}>Iniciar sesión</Text>
                </View>
              ) : (
                <View style={styles.buttonWithIcon}>
                  <IconButton icon="log-out-outline" size={24} color="white" />
                  <Text style={styles.buttonText}>Crear cuenta</Text>
                </View>
              )}
            </Button>
          </View>
        </LinearGradientContainer>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttonWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700"
  },
  buttons: {
    marginTop: 12,
    padding: 0,
    borderRadius: 8
  }
});
