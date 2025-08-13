import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext, AuthContextType } from "../store/auth-context";
import { createUser } from "../services/auth";

type Credentials = { email: string; password: string };

export default function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const authCtx = useContext<AuthContextType>(AuthContext);

  async function signupHandler({ email, password }: Credentials) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) return <LoadingOverlay message="Creating user..." />;

  return <AuthContent onAuthenticate={signupHandler} />;
}
