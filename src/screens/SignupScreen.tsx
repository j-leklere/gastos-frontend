import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext, AuthContextType } from "../store/auth-context";
import { createUser, RegisterPayload } from "../services/auth";

export default function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const authCtx = useContext<AuthContextType>(AuthContext);

  async function signupHandler({ username, email, password }: RegisterPayload) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(username, email, password);
      authCtx.authenticate(token);
    } catch {
      Alert.alert(
        "Error de autenticación",
        "No se pudo crear el usuario. Revisá los datos e intentá más tarde."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) return <LoadingOverlay message="Creando usuario..." />;

  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />;
}
