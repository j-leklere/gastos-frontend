import { useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import Button from "../UI/Button";
import Input from "./Input";
import LinearGradientContainer from "../UI/LinearGradientContainer";
import IconButton from "../UI/IconButton";

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (credentials: {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
  }) => void;
  credentialsInvalid: {
    email: boolean;
    confirmEmail: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
}

function AuthForm({ isLogin, onSubmit, credentialsInvalid }: AuthFormProps) {
  const navigation = useNavigation<NavigationProp<any>>();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch
  } = credentialsInvalid;

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Correo electronico"
          onUpdateValue={updateInputValueHandler.bind(null, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(null, "confirmEmail")}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label="Contraseña"
          onUpdateValue={updateInputValueHandler.bind(null, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              null,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <LinearGradientContainer style={styles.buttons}>
          <View>
            <Button onPress={submitHandler}>
              {isLogin ? (
                <View style={styles.buttonWithIcon}>
                  <IconButton
                    icon="log-in-outline"
                    size={24}
                    color="white"
                    onPress={() => navigation.navigate("ManageMovement")}
                  />
                  <Text style={styles.buttonText}>Iniciar sesión</Text>
                </View>
              ) : (
                <View style={styles.buttonWithIcon}>
                  <IconButton
                    icon="log-out-outline"
                    size={24}
                    color="white"
                    onPress={() => navigation.navigate("ManageMovement")}
                  />
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
  },
  form: {
    flex: 1
  }
});
