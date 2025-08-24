import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext, AuthContextType } from "../store/auth-context";
import { login, LoginPayload } from "../services/auth";

export default function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const authCtx = useContext<AuthContextType>(AuthContext);

  async function loginHandler({ username, password }: LoginPayload) {
    setIsAuthenticating(true);
    try {
      const token = await login(username, password);
      authCtx.authenticate(token);
    } catch {
      Alert.alert(
        "Error de autenticación",
        "No pudimos iniciar sesión. Revisá usuario y contraseña o probá más tarde."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) return <LoadingOverlay message="Iniciando sesión..." />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}
