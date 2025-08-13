import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext, AuthContextType } from "../store/auth-context";
import { login } from "../services/auth";

type Credentials = { email: string; password: string };

export default function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const authCtx = useContext<AuthContextType>(AuthContext);

  async function loginHandler({ email, password }: Credentials) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) return <LoadingOverlay message="Logging you in..." />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}
